
// ......................................
//// app
// ......................................
import { compose }
  from "../../../../lib/utils/helpers.js"
import { objectIngredientsToCompare } from "../../../components/utils/ingredients/activeIngredients.js";
import {
  BURGUER_NAME_REF,
  BURGUER_BASE,
  INGREDIENTS_BASE,
  INGREDIENTS_ITEMS_BASE,
  INGREDIENTS_ITEMS_BASE2,
  INITIAL_INGREDIENTS_BASE2,
  EVENTS_INIT
} from "../../../components/utils/types.js";


import {
  getBurguerStore,
  useStore
} from "../../../utils/store.js";

import { callBackEnabledContext } from "../../../components/utils/enableds/initialize.js";
import {
  compare,
  createUUID,
  elog,
  propKey,
  propKeys,
  tap,
  toFixed2,
  transduce
} from "../../../utils/helpers.js";
import { _quantityUpperZero } from "../../../components/utils/enableds/applyRoles.js";
import { Roles } from "../../../components/utils/enableds/roles.js";



// ......................................
//// set Initial Cache
// ......................................

export const setInitialCache = (createBurguerChanged) => {

  useStore('CACHE', createBurguerChanged.ingredients)

  return createBurguerChanged

}

// ......................................
//// _itemsMap
// ......................................

export function _itemsMap(ingredName, callBack) {

  const filterIngredients = this.ingredients.filter(
    ingred => ingred.name === ingredName)

  const items = filterIngredients.length > 0
    ? filterIngredients[0].items
    : []

  return callBack
    ? items.map(callBack)
    : callBackEnabledContext(items)
}

// ......................................
//// withIngredients
// ......................................

export function _withIngredients(ingredName, callBack) {

  return callBack
    ? this.ingredsNames.map(callBack)
    : this.ingredsNames.includes(ingredName)
}


// ......................................
//// differs
// ......................................

export function _differs(
  changedEnabled
) {

  const itemsMap = this.itemsMap(changedEnabled.name)
  const ctx = changedEnabled.enabledContext(_quantityUpperZero)


  const isDiff = this.ingredsNames.includes(changedEnabled.name)
    ? compare(itemsMap, ctx)
    : false

  return !isDiff

}





// ......................................
//// use Internal
// ......................................

export function useInternal(initialized) {

  // withIngredients
  const withIngredients = _withIngredients

  // itemsMap
  const itemsMap = _itemsMap

  // differs
  const differs = _differs




  // create Internal
  return BURGUER_BASE(
    initialized,
    {
      withIngredients,
      differs,
      itemsMap
    },
    'useInternal'
  )
}






// ......................................
////  totalize
// ......................................



const mapping = fn => fnReduce => (result, input) => fnReduce(result, fn(input))
const reducing = fn => fnReduce => (result, input) => fn(input)(fnReduce, result)
const filtering = fn => fnReduce => (result, input) => fn(input) ? fnReduce(result, input) : result


const reduce = x => (sum, initial) => x.reduce(sum, initial)
const items = (x) => x.items
const sub = (x) => x.map(({ price, quantity }) => price * quantity)
const sum = (x, y) => x + y

const xform = compose(
  mapping(items),
  mapping(sub),
  reducing(reduce)
)



// ......................................
////  total ingIngredients
// ......................................

const totalingIngredients = input => transduce(
  xform,
  sum,
  0,
  input
)


// ......................................
////  totalize
// ......................................

export const totalize = (createBurguer, src) => {

  const { price, ingredients, quantity: qty } = createBurguer

  const quantity = qty ? qty : 1 // case initial
  const totalIngredients = totalingIngredients(ingredients)

  const subTotal = totalIngredients + price

  const total = subTotal * quantity

  return (
    BURGUER_BASE(
      createBurguer,
      toFixed2(
        quantity,
        totalIngredients,
        subTotal,
        total
      )
      ,
      'totalize'
    )
  )
}



// ......................................
//// filter Required
// ......................................

export const filterRequired = (x, key) => x.filter(f => f.required)



// ......................................
//// filter Burguer Name
// ......................................

export const filterBurguerName = (burguerName) => (burguer) =>
  burguer.filter(f => f[BURGUER_NAME_REF] === burguerName)[0]




// ......................................
//// initial Cache
// ......................................

export const initialCache = (elementBase) =>
  BURGUER_BASE(
    elementBase, {
    cache: true,
    ingredients: getBurguerStore('CACHE')
  },
    'initialCache'
  )



// ......................................
//// create Events
// ......................................

export const createEvents = (event) => (elementBase) => ({
  ...BURGUER_BASE(
    elementBase, {
    event
  },
    'createEvents')
})



// ......................................
//// create Element Initial
// ......................................


export const createElementInitial = (
  elementBase) =>
  BURGUER_BASE(
    elementBase, {
    id: createUUID(),
    quantity: Roles.quantityBase(elementBase.event),
  },
    'createElementInitial')



// ......................................
//// create Ingreds Names
// ......................................


export const createIngredsNames = (elementBase) =>
  BURGUER_BASE(
    elementBase, {
    ingredsNamesLength: elementBase.ingredients.length,
    ingredsNames: elementBase.ingredients.map(m => m.name),
  },
    'createIngredsNames')



// ......................................
//// create Ingredients Base helpers
// ......................................


// element Items Init
const elementItemsInit = (items, itemsInit) =>
  items.filter(item => item.itemsId === itemsInit)

// create Item Base
const createItemBase = (itemsInit) =>
  itemsInit.map(item => ({
    ...INGREDIENTS_ITEMS_BASE(item,
      {}, 'createItemBase'
    )
  })
  )


// ......................................
//// create Ingredients Base
// ......................................

export const createIngredientsBase =
  (elementRequired
  ) => (
    elementBase // dataBase
  ) =>
      BURGUER_BASE(
        elementBase, {

        ingredients: elementRequired.map(required => ({

          ...INGREDIENTS_BASE(required, {

            items: createItemBase(
              elementItemsInit(
                required.ingredientsItems,
                required.itemsInit)
            )
          }, 'src')
        })
        )
      },
        'createIngredientsBase')



// ......................................
//// create Element Base
// ......................................


export const createElementBase = (burguerName) => (burguer) =>
  BURGUER_BASE(
    burguer.filter(f => f[BURGUER_NAME_REF] === burguerName)[0], {
  },
    'createElementBase')





// ......................................
////  clear Unit
// ......................................



//  clear Unit Burguer
export const clearUnitBurguer = ({
  nameToClearUnit,
  currentCreateBurguer
}) => {
  const { ingredients, ..._currentCreateBurguer } = currentCreateBurguer
  return {
    ..._currentCreateBurguer,
    ingredients: ingredients.filter(f => f.name !== nameToClearUnit)
  }
}





// ......................................
////   confirm
// ......................................


//  Update Ingredients
const updateIngredients = ({
  ingredients,
  name,
  ctx
}) =>
  ingredients.reduce((acc, ingred) =>

    ingred.name === name
      ? [...acc, {
        ...ingred,
        items: ctx.values
      }]
      : [...acc,
        ingred]

    , [])


//  concat Ingredients
const concatIngredients = ({
  ingredients,
  name,
  order,
  required,
  ctx
}) => [
    ...ingredients, {
      name: name,
      order: order,
      required: required,
      items: [
        ...ctx.values
      ]
    }
  ]



//  element Burguer
const elementBurguer = ({
  ingredients
}) => ({
  ingredients
})


//  element Enabled
const elementEnabled = (
  changedEnabled,
) => {

  const {
    name,
    enableds,
    roles: { order, required },
  } = changedEnabled

  return ({
    name,
    order,
    required,
    ctx: changedEnabled.enabledContext(_quantityUpperZero)
  })
}


//  create element (composition)
const createElement = (
  currentCreateBurguer,
  changedEnabled
) => ({
  ...elementBurguer(currentCreateBurguer),
  ...elementEnabled(changedEnabled)
})



//  _confirm Burguer base
const _confirmBurguerBase = (
  currentCreateBurguer,
  changedEnabled
) =>
  BURGUER_BASE(currentCreateBurguer, {
    ingredients:
      currentCreateBurguer.withIngredients(changedEnabled.name)
        ? updateIngredients(
          createElement(
            currentCreateBurguer,
            changedEnabled
          ))
        : concatIngredients(
          createElement(
            currentCreateBurguer,
            changedEnabled
          )
        )
  }, 'confirmBurguerBase')





// ......................................
////   confirm Burguer base
// ......................................
export const confirmBurguerBase = ({
  currentCreateBurguer,
  changedEnabled
}) =>
  currentCreateBurguer
    ? _confirmBurguerBase(
      currentCreateBurguer,
      changedEnabled
    )
    : getBurguerStore('BURGUER')




// ......................................
////  set  Events
// ......................................


const _event = (store, pid, event) => {
  const _evt = store
    ? pid
      ? event
      : 'BURGUER_RELOAD'
    : 'INITIAL'

  elog('set Events Initial', { event: _evt })

  return EVENTS_INIT.includes(_evt)
    ? _evt
    : 'BURGUER_RELOAD'
}

export const identifyEvent = (
  { currentBurguer,
    event: evt },
  pid,
  store
) => ({
  event: _event(store, pid, evt),
  currentBurguer,
  store
})










// ......................................
////  use Store create
// ......................................


export const useStoreCreate = (key, event, value) => {


  elog('use Store create', {
    key, event, value
  })

  const currentBurguer = value.nameRef
  const currentEvent = value.event

  useStore(key, value)

  useStore('QUERY', {
    currentBurguer: currentBurguer,
    entry: 'initialize',
    event: currentEvent
  })

  return (value)
}





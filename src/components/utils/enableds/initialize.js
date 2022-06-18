import { ENABLEDS_ITEMS_BASE, ENABLED_BASE, ENABLED_ROLES_BASE, INGREDIENTS_ITEMS_BASE } from "../types.js"
import { apply, _filterItem, } from "./applyRoles.js"

import { elog } from "../../../utils/helpers.js"



// ......................................
////  helpers
// ......................................


export const callBackEnabledContext = (x) => ({
  keys: x.map(m => m.name),
  values: x.map(m => ({
    itemsId: m.itemsId,
    name: m.name,
    price: m.price,
    limit: m.limit,
    quantity: m.quantity
  })
  ),
  length: x.length
})



// ......................................
////  _enabledContext
// ......................................


export function _enabledContext(fn) {

  const items = Object.entries(this.enableds).reduce((acc, [key, val]) =>
    fn(key, val)
      ? [...acc, val]
      : acc
    , [])

  return callBackEnabledContext(items)
}



const type = (x) => {

  const a = x.maxchoices === 1 ? 'one' : 'many'
  const b = x.itemsLimit === 1 ? 'One' : 'Many'
  return `${a}To${b}`
}


// ......................................
////  createRoles
// ......................................

const createRoles = (
  key,
  ingredient,
  createBurguer
) => ENABLED_ROLES_BASE(ingredient,
  {
    type: type(ingredient),
    itemsMap: createBurguer.itemsMap(key),
    ingredsNames: createBurguer.ingredsNames,
    ingredsNamesLength: createBurguer.ingredsNamesLength
  },
  'createElementRolesBase')




// creates the element by overwriting the existing ones in burguerBase
const createEnabled = (
  x,
  itemsMap
) =>
  x.ingredientsItems.reduce((
    acc, ingredsItem
  ) => ({
    ...acc,
    [ingredsItem.name]: {
      ...ENABLEDS_ITEMS_BASE(ingredsItem, {
        quantity: itemsMap.keys.includes(ingredsItem.name)
          ? _filterItem(ingredsItem.name, itemsMap.values).quantity
          : 0,
        // inc/dec Disabled initial set by default in ENABLEDS_ITEMS_BASE
      })
    }
  })
    , {})



const createElementEnabledBase = (
  key,
  event,
  createBurguer,
  ingredient,
) => {

  return ENABLED_BASE({
    valueToChange: null,
    burguerName: createBurguer.name,
    name: key,
    event: event,
    target: 'initial',
    roles: createRoles(
      key,
      ingredient,
      createBurguer
    ),
    enableds: createEnabled(
      ingredient,
      createBurguer.itemsMap(key)), // to overwriting
    context: {
      current: {
        keys: [],
        values: [],
        length: 0
      },
      previous: createBurguer.itemsMap(key),
      others: {
        keys: [],
        values: [],
        length: 0
      }
    },
    enabledContext: _enabledContext
  }, {},
    'createElementEnabledBase')
}

// ......................................
//// initialize
// ......................................

export const _initialize = (
  key,
  ingredients,
  createBurguer,
  event
) => {


  const enabledBase = createElementEnabledBase(
    key,
    event,
    createBurguer,
    _filterItem(
      key,
      ingredients)
  )

  return ({
    ...enabledBase,
    enableds: apply.base(enabledBase)
  })
}





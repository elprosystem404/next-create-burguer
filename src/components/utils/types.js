
// ......................................
////  (concentrates in one place the  burguer name)
// ......................................   'BURGUER_DIFFER'

import { elog, propsInObject } from "../../utils/helpers.js"



// events
export const EVENTS_INIT =
  ['INITIAL', 'BURGUER_EQUAL', 'BURGUER_DIFFER', 'BURGUER_RELOAD']
export const EVENTS =
  ['INITIAL', 'BURGUER_EQUAL', 'BURGUER_DIFFER', 'BURGUER_RELOAD',
    'BURGUER_NAME', 'CONFIRM',
    'CLEAR_UNIT', 'CLEAR', 'ADD', 'RESET', 'CHANGED_MENU']

export const ACTIVE_EVENTS =
  ['CHANGED_MENU', 'RESET']


export const BURGUER_NAME_REF = 'nameRef'



const defaultProps = (obj, props, src) => propsInObject(
  obj,
  props,
  src)


const _undefined = x =>
  typeof x === 'undefined'
    ? false
    : x

const burguerBase = ({
  id,
  burgerId,
  cache,
  stored,
  name,
  nameRef,
  event,
  price,
  quantity,
  ingredsNames,
  ingredsNamesLength,
  totalIngredients,
  subTotal,
  total,
  ingredients,
  withIngredients,
  differs,
  itemsMap
}) => ({
  // base
  id,
  burgerId,
  cache: _undefined(cache),
  stored: _undefined(stored),
  name,
  nameRef,
  event,
  price,
  quantity,
  ingredsNames,
  ingredsNamesLength,
  // totalized
  totalIngredients,
  subTotal,
  total,
  ingredients,
  // internal
  withIngredients,
  differs,
  itemsMap
}
)



// ......................................
////  updated Create Burguer Base
// ......................................


export const BURGUER_BASE = (burguer, props = {}, src) => {

  const propsBase = burguerBase(burguer) // others
  return ({
    ...propsBase,
    ...defaultProps(propsBase, props, src)
  })

}

// ......................................
////  update Ingredients Base
// ......................................


const ingredientsBase = ({
  name,
  order,
  required,
}) => (
  {
    name,
    order,
    required,
    items: [] // INGREDIENTS_ITEMS_BASE
  }
)

// update Ingredients Base
export const INGREDIENTS_BASE = (ingredient, props = {}, src) => {

  const propsBase = ingredientsBase(ingredient)
  return ({
    ...propsBase,
    ...defaultProps(propsBase, props, src)
  })
}





// ......................................
////  update Ingredients Base
// ......................................

const ingredientsItemsBase = ({
  itemsId,
  name,
  price,
  limit,
  quantity,
}) => (
  {
    itemsId,
    name,
    price,
    limit,
    quantity
  }
)


// ......................................
////  INGREDIENTS ITEMS BASE
// ......................................

export const INGREDIENTS_ITEMS_BASE = (item, props = {}, src) => {

  const propsBase = ingredientsItemsBase(item)
  return ({
    ...propsBase,
    ...defaultProps(propsBase, props, src)
  })
}




// ......................................
////  enableds Items Base
// ......................................


const enabledsItemsBase = (
  enabledsItems
) => ({
  ...INGREDIENTS_ITEMS_BASE(enabledsItems, {}, 'enabledsItemsBase'),
  incDisabled: false,
  decDisabled: true
})


// ......................................
////  ENABLED BASE
// ......................................

export const ENABLEDS_ITEMS_BASE = (enabledsItems, props = {}, src) => {
  const propsBase = enabledsItemsBase(enabledsItems)
  return ({
    ...propsBase,
    ...defaultProps(propsBase, props, src)
  })
}



// ......................................
////  update Enabled Base
// ......................................

const rolesBase = ({
  choices,
  maxchoices,
  itemsInit,
  itemsLimit,
  required,
  order,
  type,
  itemsMap,
  ingredsNames,
  ingredsNamesLength
}
) => ({
  choices,
  maxchoices,
  itemsInit,
  itemsLimit,
  required,
  order,
  type,
  itemsMap,
  ingredsNames,
  ingredsNamesLength
})


// ......................................
////  ENABLED BASE
// ......................................

export const ENABLED_ROLES_BASE = (enabledRoles, props = {}, src) => {
  const propsBase = rolesBase(enabledRoles)
  return ({
    ...propsBase,
    ...defaultProps(propsBase, props, src)
  })
}


const enabledBase = ({
  burguerName,
  context,  // current, others,  previous,
  enableds,
  event,
  name,
  roles,
  target,
  valueToChange,
  enabledContext
}) => ({
  burguerName,
  context,
  enableds,
  event,
  name,
  roles,
  target,
  valueToChange,
  enabledContext
})


// ......................................
////  ENABLED BASE
// ......................................

export const ENABLED_BASE = (enabled, props = {}, src) => {
  const propsBase = enabledBase(enabled)
  return ({
    ...propsBase,
    ...defaultProps(propsBase, props, src)
  })
}


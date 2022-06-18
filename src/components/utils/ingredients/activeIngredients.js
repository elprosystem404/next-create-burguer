
// ......................................
////  app
// ......................................

import { elog } from "../../../utils/helpers.js"
import { ACTIVE_EVENTS, ENABLED_BASE, INGREDIENTS_BASE, INGREDIENTS_ITEMS_BASE } from "../types.js"

// ......................................
////  create ingredients active
// ......................................

// for these events keep the iindex
const positionEvent = (event, index) =>
  ACTIVE_EVENTS.includes(event)
    ? index
    : 1


// ......................................
//// filterIngredients
// ......................................

const filterIngredientsKey = (x, value, key) =>
  x.filter(f => f[key] === value)[0]



// ......................................
////  _current Active
// ......................................

const _currentActive = (
  position,
  ingredients
) => ({
  ...filterIngredientsKey(
    ingredients,
    position,
    'ingredientsId'),

})




// ......................................
////  active Ingredients
// ......................................

export const activeIngredients = (
  index,
  ingredients,
  event) => {


  const position = positionEvent(event, index)

  const currentActive = _currentActive(
    position,
    ingredients)


  return ({
    currentActive,
    currentActiveName: currentActive.name,
    position
  })

}








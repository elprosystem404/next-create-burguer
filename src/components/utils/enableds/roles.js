import { elog } from "../../../utils/helpers.js"


// ......................................
////  Roles
// ......................................



export const Roles = {

  // 1-  quantity cannot be negative
  quantityNegativeLimit: (qty) => qty < 0 ? 0 : qty,

  // 2-  quantity cannot be greater than the limit
  quantityLowerLimit: (qty, limit) => qty < limit,

  // 3-  if it's empty
  isEmptyItems: (arr) => arr.length <= 0,

  // 4- quantity of items added cannot be greater than ingredient limit
  maxchoicesUpperLimit: (length, maxchoices) => length > maxchoices,

  // 5- if it's incomplete
  maxchoicesLowerLimit: (length, maxchoices) => length < maxchoices,

  // 6- if it's complete
  maxchoicesEqualLimit: (arr, maxchoices) => arr.length === maxchoices,

  // 7- complete case can only add if it is in existing
  includesExisting: (arr, key) => arr.includes(key),

  identity: (x) => x,

  quantityBase: (event, value) => event === 'INITIAL' ? 1 : value,

  decDisabled: (qty) => qty === 0 ? true : false,
}





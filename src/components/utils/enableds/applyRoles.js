

// ......................................
//// app
// ......................................

import {
  Roles
} from "./roles.js"
import {
  CallBack
} from "./callbackRoles.js"
import {
  compose,
  elog,
  removeItem,
  removeProp
} from "../../../utils/helpers.js"


// ......................................
////  helpers
// ......................................

export const _quantityUpperZero = (key, val) => val.quantity > 0
export const _identity = x => Roles.identity(x)
export const _propInObject = obj => key => key in obj
export const _isOthersInitial = (x) =>
  (key) => !_includes(x.context.previous.keys)(key)
const _isOthers = (x) => (key) =>
  !_includes(x.context.previous.keys)(key) &&
  !_isEqual(key)(x.context.current.keys[0])
export const _isEqual = (a) => (b) => a === b
export const _filterItem = (key, x) => x.filter(f => f.name === key)[0]
export const _includes = arr => (key) => Roles.includesExisting(arr, key)
export const _afterAdded = includes => includes ? 0 : 1
export const _itemsMapLength = afterAdded => length => length + afterAdded
export const _exceeded = maxchoices => itemsMapLength =>
  Roles.maxchoicesUpperLimit(itemsMapLength, maxchoices)
export const _exceeds = (currentKey, x) =>
  compose(
    _exceeded(x.roles.maxchoices),
    _itemsMapLength(x.roles.itemsMap.length),
    _afterAdded,
    _includes(x.roles.itemsMap.keys)
  )(currentKey)




// Apply callback to context
const x5 = (x) => {

  return ({

    // others
    ...(x.context.others.keys).reduce((acc, key, index) => ({
      ...acc,
      [key]: {
        ...x.context.others.values[index],
        ...CallBack[x.target][x.roles.type].others(
          key,
          x.roles,
          x.context.previous,
          index)
      }
    })
      , {}),


    // previous
    ...(x.context.previous.keys).reduce((acc, key, index) => ({
      ...acc,
      [key]: {
        ...x.context.previous.values[index],
        ...CallBack[x.target][x.roles.type].previous(
          key,
          x.roles,
          x.context.previous,
          index)
      }
    })
      , {}),


    // current
    ...x.target === "initial"
      ? {}
      : {
        [x.context.current.keys[0]]: {
          ...x.context.current.values[0],
          ...CallBack[x.target][x.roles.type].current(
            x.valueToChange,
            x.context.current.values[0])
        }
      },
  })
}

// Updated others
const x4 = (x) => {
  return ({
    ...x,
    context: {
      ...x.context,
      others: x.enabledContext(_isOthers(x))
    }

  })
}


// Updated initial others
const x6 = (x) => {
  return ({
    ...x,
    context: {
      ...x.context,
      others: x.enabledContext(_isOthersInitial(x))
    }

  })
}

// Update previous with the updated enableds
const x3 = (x) => {

  return ({
    ...x,
    context: {
      ...x.context,
      previous: x.enabledContext(_quantityUpperZero)
    }

  })
}

// Update enableds with the currently updated current
const x2 = (x) => {
  return ({
    ...x,
    enableds: {
      ...x.enableds,
      [x.context.current.keys[0]]: {
        ...x.context.current.values[0],
        quantity: x.valueToChange
      }
    }
  })
}

// Update the current with the value to change
const x1 = (x) => {
  return ({
    ...x,
    context: {
      ...x.context,
      current: x.enabledContext(_isEqual(x.context.current.keys[0]))
    }
  })
}

const xContext = (x) => ({
  ...compose(x5, x4, x3, x2, x1)(x)
})

const xInitial = (x) => ({
  ...compose(x5, x6)(x)
})

const xEmpty = (x) => _identity(x)


// ......................................
//// apply
// ......................................



export const apply = {

  base: (x) => _includes(x.roles.ingredsNames)(x.name)
    ? xInitial(x)
    : xEmpty(x.enableds),

  oneToOne: (x) => _includes(x.roles.ingredsNames)(x.name)
    ? xContext(x)
    : _identity(x.enableds),

  oneToMany: (x) => _includes(x.roles.ingredsNames)(x.name)
    ? xContext(x)
    : _identity(x.enableds),

  manyToOne: (x) => _includes(x.roles.ingredsNames)(x.name)
    ? _exceeds(x.context.current.keys[0], x)
      ? _identity(x.enableds)
      : xContext(x)
    : xContext(x),// xEmpty(x),

  manyToMany: (x) => _includes(x.roles.ingredsNames)(x.name)
    ? _exceeds(x.context.current.keys[0], x)
      ? _identity(x.enableds)
      : xContext(x)
    : xContext(x)

}

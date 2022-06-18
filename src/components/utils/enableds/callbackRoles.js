import { Roles } from './roles.js'
import { elog, tap } from '../../../utils/helpers.js'




// ......................................
////  Call Back
// ......................................

export const CallBack = {

  initial: {

    oneToOne: {

      current: () => null,

      previous: (key, roles, prev, index) => ({
        incDisabled: true,
        decDisabled: Roles.decDisabled(1),
        quantity: 1
      }),

      others: (key, roles, prev, index) => ({
        incDisabled: false,
        decDisabled: Roles.decDisabled(0),
        quantity: 0
      })
    },

    oneToMany: {

      current: () => null,

      previous: (key, roles, prev, index) => ({
        ...Roles.identity({
          incDisabled: Roles.quantityLowerLimit(prev.values[index].quantity, roles.itemsLimit)
            ? false
            : true,
          decDisabled: Roles.decDisabled(prev.values[index].quantity),
          quantity: Roles.quantityLowerLimit(prev.values[index].quantity, roles.itemsLimit)
            ? Roles.quantityNegativeLimit(prev.values[index].quantity)
            : roles.itemsLimit
        })
      }),

      others: (key, roles, prev, index) => ({
        incDisabled: false,
        decDisabled: Roles.decDisabled(0),
        quantity: 0
      })
    },

    manyToOne: {

      current: () => null,

      previous: (key, roles, prev, index) => ({
        incDisabled: Roles.maxchoicesLowerLimit(
          prev.length,
          roles.maxchoices)
          ? false : true,
        decDisabled: Roles.decDisabled(1),
        quantity: 1
      }),


      others: (key, roles, prev, index) => ({
        incDisabled: Roles.maxchoicesLowerLimit(
          prev.length,
          roles.maxchoices)
          ? false : true,
        decDisabled: Roles.decDisabled(0),
        quantity: 0
      })
    },

    manyToMany: {

      current: () => null,

      previous: (key, roles, prev, index) => ({
        ...Roles.identity({
          incDisabled: Roles.maxchoicesLowerLimit(
            prev.length,
            roles.maxchoices)
            ? false : true,
          decDisabled: Roles.decDisabled(prev.values[index].quantity),
          quantity: prev.values[index].quantity
        })
      }),

      others: (key, roles, prev, index) => ({
        incDisabled: Roles.maxchoicesLowerLimit(prev.length, roles.maxchoices)
          ? false
          : true,
        decDisabled: Roles.decDisabled(0),
        quantity: 0
      })
    }
  },

  onChange: {

    // onChange
    oneToOne: {

      current: (valueToChange, value) => ({
        incDisabled: Roles.quantityLowerLimit(valueToChange, value.limit)
          ? false
          : true,
        decDisabled: Roles.decDisabled(valueToChange),
        quantity: valueToChange
      }),

      previous: (key, roles, prev, index) => ({
        incDisabled: false,
        decDisabled: Roles.decDisabled(0),
        quantity: 0
      }),

      others: (key, roles, prev, index) => ({
        incDisabled: false,
        decDisabled: Roles.decDisabled(0),
        quantity: 0
      })
    },

    // onChange
    oneToMany: {

      current: (valueToChange, value) => ({
        incDisabled: Roles.quantityLowerLimit(valueToChange, value.limit)
          ? false
          : true,
        decDisabled: Roles.decDisabled(valueToChange),
        quantity: Roles.quantityLowerLimit(valueToChange, value.limit)
          ? Roles.quantityNegativeLimit(valueToChange)
          : value.limit
      }),

      previous: (key, roles, prev, index) => ({
        incDisabled: false,
        decDisabled: Roles.decDisabled(0),
        quantity: 0
      }),

      others: (key, roles, prev, index) => ({
        incDisabled: false,
        decDisabled: Roles.decDisabled(0),
        quantity: 0
      })
    },


    // onChange
    manyToOne: {

      current: (valueToChange, value) => ({
        incDisabled: Roles.quantityLowerLimit(valueToChange, value.limit)
          ? false
          : true,
        decDisabled: Roles.decDisabled(1),
        quantity: valueToChange
      }),

      previous: (key, roles, prev, index) => ({
        ...Roles.identity({
          incDisabled: Roles.maxchoicesLowerLimit(
            prev.length,
            roles.maxchoices)
            ? false
            : true,
          decDisabled: Roles.decDisabled(prev.values[index].quantity),
          quantity: Roles.quantityLowerLimit(prev.values[index].quantity, roles.itemsLimit)
            ? Roles.quantityNegativeLimit(prev.values[index].quantity)
            : roles.itemsLimit
        })
      }),

      others: (key, roles, prev, index) => ({
        incDisabled: Roles.maxchoicesLowerLimit(
          prev.length,
          roles.maxchoices
        )
          ? false
          : true,
        decDisabled: Roles.decDisabled(0),
        quantity: 0
      })
    },

    // onChange
    manyToMany: {

      current: (valueToChange, value) => ({
        incDisabled: Roles.quantityLowerLimit(valueToChange, value.limit)
          ? false
          : true,
        decDisabled: Roles.decDisabled(valueToChange),
        quantity: Roles.quantityLowerLimit(valueToChange, value.limit)
          ? Roles.quantityNegativeLimit(valueToChange)
          : value.limit
      }),

      previous: (key, roles, prev, index) => ({
        ...Roles.identity({
          incDisabled: Roles.maxchoicesLowerLimit(
            prev.length,
            roles.maxchoices)
            ? false
            : true,
          decDisabled: Roles.decDisabled(prev.values[index].quantity),
          quantity: Roles.quantityLowerLimit(prev.values[index].quantity, roles.itemsLimit)
            ? Roles.quantityNegativeLimit(prev.values[index].quantity)
            : roles.itemsLimit
        })
      }),

      others: (key, roles, prev, index) => ({
        incDisabled: Roles.maxchoicesLowerLimit(prev.length, roles.maxchoices)
          ? false
          : true,
        decDisabled: Roles.decDisabled(0),
        quantity: 0
      })
    }
  }

}


import { compose, elog, tap } from "../../../utils/helpers.js"
import {
  clearUnitBurguer,
  confirmBurguerBase,
  createElementBase, createElementInitial, createEvents, createIngredientsBase, createIngredsNames, filterBurguerName,
  filterRequired, initialCache, setInitialCache, totalize, useInternal, useStoreCreate
} from "./index.js"




// ......................................
////  create events
// ......................................

const CreateEvents = {

  initialEvents: (
    value, // name of burguer
    burguer,
    ingredients,
    event // provides the event because initial contains no event
  ) =>
    compose(
      setInitialCache,
      useInternal,
      totalize,
      createElementInitial,
      createIngredsNames,
      createIngredientsBase(filterRequired(ingredients)),
      createEvents(event),
      createElementBase(value) // <- name of burguer
    )(burguer),

  cacheEvents: (
    value,
    burguer,
    event
  ) =>
    compose(
      useInternal,
      totalize,
      createElementInitial,
      createIngredsNames,
      initialCache,
      createEvents(event),
      createElementBase(value) // <- name of burguer
    )(burguer),

  storeEvents: (
    store,
    event
  ) =>
    useInternal({
      ...store,
      event: event,
      stored: true
    }),

  updateEvents: (
    value,
    event
  ) =>
    compose(
      useInternal,
      totalize,
      createIngredsNames,
      createEvents(event)
    )(value), // <- crerateBurguer
}






// ......................................
//// _Events
// ......................................


const _Events = {

  // ......................................
  //// Initial events
  // ......................................

  changedInitial: ({
    event, burguer, ingredients, value
  }) =>
    CreateEvents.initialEvents(
      value,
      burguer,
      ingredients,
      event
    ),


  changedInitialDiffer: ({
    event, burguer, value
  }) => CreateEvents.cacheEvents(
    value,
    burguer,
    event),


  changedInitialEqual: ({
    store, event
  }) =>
    CreateEvents.storeEvents(
      store,
      event),

  changedInitialReload: ({
    store, event
  }) =>
    CreateEvents.storeEvents(
      store,
      event),


  // ......................................
  ////  changed events
  // ......................................


  changedBurguerName: (value) => ({
    event, burguer,
  }) =>
    _Events.changedInitialDiffer({
      event, burguer, value
    }),

  changedAdd: (value) => ({
    event, burguer
  }) =>
    _Events.changedInitialDiffer({
      event, burguer, value
    }),

  changedClear: (value) => ({
    event, burguer
  }) =>
    _Events.changedInitialDiffer({
      event, burguer, value
    }),

  changedClearUnit: (value) => ({
    event, burguer
  }) =>
    CreateEvents.updateEvents(
      value,
      event),

  changedConfirm: (value) => ({
    event, burguer
  }) =>
    CreateEvents.updateEvents(
      value,
      event),

  changedQty: (value) => ({
    event, burguer
  }) =>
    CreateEvents.updateEvents(
      value,
      event)
}


// ......................................
//// Events
// ......................................


export const EVENT = {

  // ......................................
  //// Initial events
  // ......................................

  INITIAL: (event, value) =>
    _Events.changedInitial({
      ...value,
      event,
      value: value.currentBurguer
    }),

  BURGUER_DIFFER: (event, value) =>
    _Events.changedInitialDiffer({
      ...value,
      event,
      value: value.currentBurguer
    }),

  BURGUER_EQUAL: (event, value) =>
    _Events.changedInitialEqual({
      ...value,
      event,
      value: value.currentBurguer
    }),

  BURGUER_RELOAD: (event, value) =>
    _Events.changedInitialReload({
      ...value,
      event,
      value: value.currentBurguer
    }),

  // ......................................
  ////  changed events
  // ......................................

  BURGUER_NAME: (value, resetFn) => ({
    event: 'BURGUER_NAME',
    resetFn,
    eventFn: _Events.changedBurguerName(value),
  }),

  ADD: (value, resetFn) => ({
    event: 'ADD',
    resetFn,
    eventFn: _Events.changedAdd(value.nameRef),
  }),

  CLEAR: (value, resetFn) => ({
    event: 'CLEAR',
    resetFn,
    eventFn: _Events.changedClear(value),
  }),

  CLEAR_UNIT: (value, resetFn) => ({
    event: 'CLEAR_UNIT',
    resetFn,
    eventFn: _Events.changedClearUnit(
      clearUnitBurguer({
        ...value
      })
    ),
  }),

  CONFIRM: (value, resetFn) => ({
    event: 'CONFIRM',
    resetFn,
    eventFn: _Events.changedConfirm(
      confirmBurguerBase({
        ...value
      })
    ),
  }),

  QTY: (value, resetFn) => ({
    event: 'QTY',
    resetFn,
    eventFn: _Events.changedQty({
      ...value,
      quantity: value.quantity,
    }),
  })
}


// ......................................
////  set  Events
// ......................................



// ......................................
////  set Initial Events
// ......................................

export const setInitialEvents = ({
  burguer,
  ingredients,
  currentBurguer,
  event,
  store }
) => reportInitialEvent =>
    useStoreCreate(
      'BURGUER',
      event,
      reportInitialEvent(event, {
        burguer,
        ingredients,
        currentBurguer,// value
        store
      }
      )
    )


// ......................................
//// set Changed Events
// ......................................

export const setChangedEvents = (
  fn,
  event,
  burguer) =>
  useStoreCreate(
    'BURGUER',
    event,
    fn({
      event,
      burguer
    })
  )



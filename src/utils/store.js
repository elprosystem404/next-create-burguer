import Cookies from 'js-cookie'
import { elog } from './helpers.js'

export const hasLocalStorage = () => {
  if (typeof self !== 'object' || !('localStorage' in self)) {
    return false
  }
}

// ......................................
////  getAllBurguerStore
// ......................................

export const getAllBurguerStore = () => {


  // console.log('getAllBurguerStore.......', keys);

  const valueParse = Cookies.get()
  const keys = valueParse
    ? Object.keys(valueParse).reduce((acc, prev) => {

      return ({
        ...acc,
        [prev]: JSON.parse(valueParse[prev])

      })

    }, {})

    : []


  return !valueParse
    ? null
    : keys ?? null
}

// ......................................
////  set Burguer Store
// ......................................

export const setBurguerStore = (key, value) => {

  const valueToSet = value ? value : null

  return !key
    ? null
    : Cookies.set(key, JSON.stringify(valueToSet)) ?? null
}



// ......................................
////  getBurguerStore
// ......................................

export const getBurguerStore = (key) => {

  const value = Cookies.get(key)

  return !value
    ? null
    : JSON.parse(value) ?? null
}


// ......................................
////  removeBurguerStore
// ......................................



export const removeBurguerStore = (key) => {

  const value = Cookies.get(key)

  return !value
    ? null
    : Cookies.remove(key) ?? null
}


// ......................................
////  removeAllBurguerStore
// ......................................

const removeall = (storageKeys, keys, _) => storageKeys.forEach((key) => removeBurguerStore(key))


const removeallexcept = (storageKeys, keys, except) =>
  storageKeys.forEach((key) => {
    const remove = except.includes(key)
    !except.includes(key) && removeBurguerStore(key)
  })


const removealljust = (storageKeys, keys, _) => keys.forEach((key) => removeBurguerStore(key))


const caseFn = (keys, except) => ({
  ...((keys.length === 0 && !except) && { fn: removeall }),
  ...((keys.length === 0 && except) && { fn: removeallexcept }),
  ...((keys.length > 0 && !except) && { fn: removealljust }),

})

const execute = ({ fn }) => (storageKeys, keys, except) => fn(storageKeys, keys, except)


// ([]-> all )  ([]-> all, { except: ['b'] })    (['a','b'] -> just these)
export const removeAllBurguerStore = (keys, { except = false }) => {

  const storageKeys = Cookies.get()

  return !storageKeys
    ? null
    : execute(caseFn(keys, except))(Object.keys(storageKeys), keys, except)

}


export const removeAllCartBurguerStore = (key) => {

  const value = Cookies.get()

  return !value
    ? null
    : removeBurguerStore(key)
}



// ......................................
////  use Store
// ......................................


export const useStore = (key, value) => {

  // Pass initial state function to useState so logic is only executed once
  if (typeof window === "undefined") {
    return null;
  }

  // Save to storage
  if (typeof window !== "undefined") {
    key && value && setBurguerStore(key, value)
  }
}



// ......................................
//// set Query Store
// ......................................

export const setQueryStore = (
  key,
  query
) => {

  useStore(key, {
    currentBurguer: query.currentBurguer ?? null,
    entry: query.entry ?? null,
    event: query.event ?? null
  })
}

// ......................................
//// get Query Store
// ......................................

export const getQueryStore = (key) => {

  const query = getBurguerStore(key)

  return query
    ? ({
      currentBurguer: query.currentBurguer,
      entry: query.entry,
      event: query.event
    })
    : ({
      currentBurguer: null,
      entry: null,
      event: null
    })

}




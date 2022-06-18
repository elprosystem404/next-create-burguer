import React, { useEffect, useRef, useState } from "react"
import Cookies from 'js-cookie'

/*
https://www.loginradius.com/blog/engineering/how-to-fix-memory-leaks-in-react/

import { useEffect, useRef } from 'react';

export default function useIsComponentMounted() {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => isMounted.current = false;
  }, []);
  return isMounted;
};

export default function useStateIfMounted (initialValue) {
  const isComponentMounted = useIsComponentMounted();
  const [state, setState] = useState(initialValue);
  const newSetState = useCallback((value) => {
    if (isComponentMounted.current) {
      setState(value);
    }
  }, [isComponentMounted]);
  return [state, newSetState]
}

*/







// https://liamsilk.dev/posts/persisting-and-sharing-state-using-reacts-usecontext-hook-and-local-storage/



// ......................................
//// isFunc
// ......................................

const isFn = x => typeof x === 'function'


// ......................................
//// Save State Stored (Save state)
// ......................................

const SaveStateStored = (key, valueToStore) => {

  // Save to storage
  if (typeof window !== "undefined") {
    const value = typeof valueToStore === 'undefined'
      ? null
      : valueToStore
    Cookies.set(key, JSON.stringify(value));
  }

  return valueToStore
}

// ......................................
//// check Key
// ......................................

const checkKey = (key) => {
  if (!key || typeof key !== 'string') throw new Error(`[INIT_VALUE_DEFAULT] key/checkStore - Element type is invalid: expected a string but got: ${typeof key}`)
}


// ......................................
//// check Storage
// ......................................

const checkStorage = (key, initialValue) => {

  // Pass initial state function to useState so logic is only executed once
  if (typeof window === "undefined") {
    return null;
  }

  try {
    // Get from local storage by key
    const item = Cookies.get(key);
    // Parse stored json or if none return initialValue
    return item
      ? JSON.parse(item)
      : SaveStateStored(key, initialValue);
  } catch (error) {
    // If error also return initialValue
    console.log(error);
    return initialValue;
  }
}


// ......................................
//// use Set State
// ......................................

/**
 * @function useSetState React Hook Custom
 * Similar to useState, but takes an key as an argument
 * @param key String
 * @param value  Any
 * @returns An Array containing a stateful value and a function to update it.
 */


const useSetState = (key, value) => {

  // console.log('useSetState.........', { key, value: value() });

  checkKey(key)


  // ......................................
  //// state of storedValue ( State to store our value)
  // ......................................

  const [storedValue, setStoredValue] =
    useState(() => {

      const initialValue = isFn(value)
        ? value() ?? null
        : value ?? null

      return checkStorage(key, initialValue)
    });


  // ......................................
  //// set State
  // ......................................

  const setState = (value) => {

    try {
      // Save to local state in sync with storage
      setStoredValue((prevState) => {
        return isFn(value)
          // Save to storage
          ? SaveStateStored(key, value(prevState))
          : SaveStateStored(key, value)
      })
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  }

  // ......................................
  //// return
  // ......................................

  return [storedValue, setState]

}



export { useSetState }

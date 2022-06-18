import { useRef } from "react"

// custom hook
const useDebounce = (fn, delay) => {

  const timeoutRef = useRef(null)

  const debounceFn = (...args) => {
    console.log('debounceFn', args);
    clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {

      fn(...args)

    }, delay)

  }

  return debounceFn
}

export default useDebounce


/*
  // ......................................
  ////  debounce
  // ......................................

  // -> onChange
  const debouncedChange = useDebounce(onChange, 500)

   // ->  onChange={handleChange}
  const handleChange = (event) => {
    setDisplayValue(event.target.value)
    debouncedChange(event.target.value)
  }
 */
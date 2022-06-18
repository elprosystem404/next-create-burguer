
// ......................................
//// react/next
// ......................................
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import { useRouter }
  from "next/router";


// ......................................
//// app
// ......................................


import {
  getBurguerStore,
  removeAllBurguerStore,
  removeBurguerStore,
  setBurguerStore
} from "../../utils/store.js";
import { useCartBurguerContext }
  from "../cartBurguerProvider/useCartBurguerContext.js";
import { identifyEvent, useStoreCreate }
  from "./utils/index.js";
import { useChangedEvents }
  from "../../hook/changedEvents.js";
import { useInitialEvents } from "../../hook/useInitialEvents.js";
import { elog, tap }
  from "../../utils/helpers.js"
import { setChangedEvents, setInitialEvents } from "./utils/events.js";






// ......................................
//// create Context
// ......................................

export const CreateBurguerContext = createContext()


// ......................................
//// Create Burguer Context Provider
// ......................................

export const CreateBurguerContextProvider = ({ children, ...props }) => {

  // ......................................
  //// defines if there was a reload page
  // ......................................

  const router = useRouter()
  const { pid } = router.query

  const {
    burguer,
    ingredients,
    burguerNameRouter
  } = props

  const {
    reportCartBurguer
  } = useCartBurguerContext()

  const {
    changedEvent,
    reportChangedEvent,
  } = useChangedEvents()

  const {
    reportInitialEvent,
  } = useInitialEvents()


  // ......................................
  //// state of view
  // ......................................


  const [createBurguer, setCreateBurguer] = useState(
    () => setInitialEvents({
      burguer,
      ingredients,
      ...identifyEvent(
        burguerNameRouter,
        pid,
        getBurguerStore('BURGUER')
      )
    })(reportInitialEvent)
  )

  // changedEvent
  useEffect(() => {

    const { event, resetFn, eventFn } = changedEvent

    const changed = eventFn && setChangedEvents(
      eventFn,
      event,
      burguer
    )

    // set (local store)
    eventFn && setCreateBurguer(
      changed
    )


    // report CartBurguer Context
    event === 'ADD' && reportCartBurguer(
      createBurguer)

    //  reset initial
    resetFn && resetFn()


  }, [
    changedEvent,
    createBurguer
  ])

  // ......................................
  ////  Values provided
  // ......................................

  const values = useMemo(() => (
    {
      createBurguer,
      burguer,
      ingredients,
      burguerNameRouter,
      changedEvent,
      reportChangedEvent,

    }
  ), [
    createBurguer,
    burguer,
    ingredients,
    burguerNameRouter,
    changedEvent,
    reportChangedEvent,


  ]);



  return (

    <CreateBurguerContext.Provider
      value={values}>
      {children}
    </CreateBurguerContext.Provider>

  )
}

/**
   entrada
   add  -> ok
   add mesmo -> não add -> ok
   add qty -> + -> ok
   add mesmo/alterar ingredients ->
   2 do mesmo com ingredentes diferentes  1 vez -> ok
   error -> pegou a quantidade do 1º

    error -> mais de um item não sabe qual comparar



 */


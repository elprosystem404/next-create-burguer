import { useCallback, useEffect, useMemo, useState } from "react";
import { INITIAL_TIME_STAMP } from "../components/utils/types.js";
import { EVENT } from "../context/createBurguerProvider/utils/events.js";

import { elog } from "../utils/helpers.js";



// ......................................
////  use changed Events
// ......................................


export const useChangedEvents = () => {

  const [changedEvent, setChangedEvent] = useState({
    event: false,
    value: false,
    resetFn: false
  });


  // ......................................
  ////  set initial state
  // ......................................


  const resetFn = () => setChangedEvent({
    event: false,
    resetFn: false,
    eventFn: false,
  })



  // ......................................
  ////  report Changed event
  // ......................................

  const reportChangedEvent = useCallback((event, value) => {

    setChangedEvent((prev) => {

      return EVENT[event](
        value,
        resetFn)
    })
  }, [changedEvent])



  // context provider
  const values = useMemo(() => (
    {
      setChangedEvent,
      changedEvent,
      reportChangedEvent: reportChangedEvent
    }
  ), [
    setChangedEvent,
    changedEvent,
    reportChangedEvent
  ]
  );

  return values;
};
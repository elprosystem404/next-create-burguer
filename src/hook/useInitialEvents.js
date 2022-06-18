import { useCallback, useEffect, useMemo, useState } from "react";
import { EVENT } from "../context/createBurguerProvider/utils/events.js";

import { elog } from "../utils/helpers.js";




// ......................................
////  use changed Events
// ......................................


export const useInitialEvents = () => {


  // ......................................
  ////   initial state
  // ......................................

  const [initialEvent, setInitialEvent] = useState(false);




  // ......................................
  ////  report Initial event
  // ......................................

  const reportInitialEvent = useCallback((event, value) => {

    return EVENT[event](
      event,
      value)

  }, [initialEvent])



  // context provider
  const values = useMemo(() => (
    {
      reportInitialEvent
    }
  ), [
    reportInitialEvent
  ]
  );

  return values;
};
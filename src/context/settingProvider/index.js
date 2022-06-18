
import { createContext, useEffect, useMemo, useState } from "react";
import { useChangedEvents } from "../../hook/changedEvents.js";
import { useCartBurguerContext } from "../cartBurguerProvider/useCartBurguerContext.js";


// ......................................
////  SettingBurguerContext
// ......................................

export const SettingBurguerContext = createContext()


// ......................................
//// Setting Burguer Provider (Container Components)
// ......................................

const SettingBurguerProvider = (
  { children, ...props }
) => {


  const {
    isToggleEnabled,
    toggleEnabled,
    initialtoggleEnabled,
    toggleQtyEnabled,
    isToggleQtyEnabled
  } = useChangedEvents()

  const [isEnabled, setIsEnabled] = useState(isToggleEnabled);



  useEffect(() => {

    setIsEnabled(isToggleEnabled)

  }, [isToggleEnabled])


  const values = useMemo(() => (
    {
      isEnabled,
      isToggleEnabled,
      toggleEnabled,
      initialtoggleEnabled,

      isToggleQtyEnabled,
      toggleQtyEnabled

    }
  ), [
    isEnabled,
    isToggleEnabled,
    toggleEnabled,
    initialtoggleEnabled,

    isToggleQtyEnabled,
    toggleQtyEnabled

  ])



  return (
    <SettingBurguerContext.Provider value={values}>
      {children}
    </SettingBurguerContext.Provider>
  )
}

export default SettingBurguerProvider
import { createContext, useEffect, useMemo, useState } from "react";

import useToggleDrawer from "../../hook/useToggleDrawer.js";
import { elog } from "../../utils/helpers.js";


// ......................................
//// create Context
// ......................................



export const BurguerDisplayContext = createContext()



const filterCurrentBurguer = (burguerName, burguer) => {

  return burguer.filter(f => f.nameRef === burguerName)[0]
}



// ......................................
//// Burguer Display Context Provider
// ......................................

export const BurguerDisplayContextProvider = ({
  children,
  burguerNameRouter,
  burguer }) => {


  const [currentBurguer, setCurrentBurguer] = useState(() => {

    const curr = filterCurrentBurguer(burguerNameRouter, burguer)
    return curr

  })

  useEffect(() => {

    setCurrentBurguer(filterCurrentBurguer(burguerNameRouter, burguer))

  }, [currentBurguer, burguerNameRouter])


  const {
    isDrawerOpen, toggleDrawer,
    isToggleDisplayBurguerName,
    toggleDisplayBurguerName
  } = useToggleDrawer();


  useEffect(() => {

    isToggleDisplayBurguerName &&
      setCurrentBurguer(filterCurrentBurguer(isToggleDisplayBurguerName, burguer))

  }, [isToggleDisplayBurguerName])



  // ......................................
  ////  Values provided
  // ......................................



  const values = useMemo(() => (
    {
      isDrawerOpen,
      toggleDrawer,
      isToggleDisplayBurguerName,
      toggleDisplayBurguerName,
      burguerNameRouter,
      currentBurguer,
      burguer

    }
  ), [
    isDrawerOpen,
    toggleDrawer,
    isToggleDisplayBurguerName,
    toggleDisplayBurguerName,
    burguerNameRouter,
    currentBurguer,
    burguer

  ]);


  return (
    <BurguerDisplayContext.Provider
      value={values}>
      {children}
    </BurguerDisplayContext.Provider>

  )

}


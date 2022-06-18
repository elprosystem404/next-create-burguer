import { useCallback, useEffect, useMemo, useState } from "react";


const useToggleDrawer = () => {


  // ......................................
  ////  state toggleDrawer
  // ......................................

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)


  // ......................................
  ////  state is Toggle Display Burguer Name
  // ......................................

  const [isToggleDisplayBurguerName, setIstoggleDisplayBurguerName] = useState(false)


  // ......................................
  ////  toggleDrawer
  // ......................................

  const toggleDrawer = useCallback((open) => (event) => {

    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  }, [isDrawerOpen])



  // ......................................
  ////  toggleDisplayBurguerName
  // ......................................

  const toggleDisplayBurguerName = useCallback((burguerNameRouter) => {

    setIstoggleDisplayBurguerName(burguerNameRouter);

  }, [isToggleDisplayBurguerName])



  // ......................................
  ////  Values provided
  // ......................................

  const values = useMemo(() => (
    {
      isDrawerOpen,
      toggleDrawer,
      isToggleDisplayBurguerName,
      toggleDisplayBurguerName
    }
  ), [isDrawerOpen, toggleDrawer, isToggleDisplayBurguerName, toggleDisplayBurguerName]);

  return values;
};



export default useToggleDrawer
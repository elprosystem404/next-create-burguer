
// ......................................
//// next/react
// ......................................

import { createContext, useEffect, useMemo, useState } from "react";


import { getBurguerStore } from "../../utils/store.js";
import {
  updateQuantityCartBurguer,
  updateCart, convertToObjectCart,
  editCartBurguer, existCartBurguerName,
  addCartBurguer, caseNoEmpty, isSameBurguer,
  INGREDIENTS_CART_BURGUER_BASE,
  totalingIngredientsCartBurguer,
  addQtyCartBurguer,
  _isSameBurguer
} from "./utils/index.js";

import { elog } from "../../utils/helpers.js";



// ......................................
//// create Context
// ......................................


export const CartBurguerContext = createContext()



// ......................................
//// Cart Burguer Context Provider
// ......................................

export const CartBurguerContextProvider = ({ children }) => {




  // ......................................
  //// state view
  // ......................................

  const [cart, setCart] = useState(() => {

    const cartStore = getBurguerStore('CART')
    return cartStore
      ? cartStore
      : []
  })


  // ......................................
  //// side effect (always when cartBurguer is changed)
  // ......................................

  useEffect(() => {

  }, [cart])




  // ......................................
  //// add Cart
  // ......................................

  const addCart = (createBurgerToAdd) => {

    setCart(cartPrevState => {

      const currentCartBurguer =
        addCartBurguer(
          cartPrevState, // -> []
          createBurgerToAdd // -> {}
        )

      // elog('current Cart Burguer', {
      //   currentCartBurguer
      // })

      return currentCartBurguer
    })
  }





  // ......................................
  //// report Cart Burguer
  // ......................................

  const reportCartBurguer = (createBurgerToAdd) => {

    addCart(createBurgerToAdd)

  }




  // ......................................
  //// set Cart Clear All
  // ......................................

  const setCartClearAll = () => setCart([])



  const amountCartBurguer = cart ? cart.length : 0


  // ......................................
  //// getCartBurguerContext
  // ......................................

  const getCartBurguer = () => cart



  // ......................................
  //// hasCartBurguer
  // ......................................

  const hasCartBurguer = () => {

    const cartBurguer = getCartBurguer()

    return cartBurguer ? cartBurguer.length > 0 : false

  }



  // ......................................
  //// getCartBurguerNameContext
  // ......................................


  const getCartBurguerNameContext = (burguerName) => {

    const { exist, cartBurguerName } = hasCartBurguer()
      ? existCartBurguerName(
        getCartBurguer(),// <- cartBurguer
        burguerName
      )
      : { exist: false, cartBurguerName: null }

    return { exist, cartBurguerName }
  }




  // ......................................
  //// setEditCartBurguerContext
  // ......................................


  const setEditCartBurguerContext = (createBurger) => {

    const { name: burguerName } = createBurger

    const { exist, cartBurguerName } = getCartBurguerNameContext(burguerName)

    exist && setCart('setCartBurguer 167',
      editCartBurguer(createBurger, getCartBurguer())
    )
  }



  // ......................................
  ////  Values provided
  // ......................................

  const values = useMemo(() => ({
    cart,
    amountCartBurguer,

    setCart,
    reportCartBurguer,
    getCartBurguer,
    getCartBurguerNameContext,
    setEditCartBurguerContext,
    setCartClearAll,
    hasCartBurguer
  }
  ), [
    cart,
    amountCartBurguer,

    setCart,
    reportCartBurguer,
    getCartBurguer,
    getCartBurguerNameContext,
    setEditCartBurguerContext,
    setCartClearAll,
    hasCartBurguer
  ]);




  return (

    <CartBurguerContext.Provider
      value={values}>
      {children}
    </CartBurguerContext.Provider>
  )
}


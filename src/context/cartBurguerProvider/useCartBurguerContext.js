import { useContext } from "react"
import { CartBurguerContext } from "./index.js"


export const useCartBurguerContext = () => {

  const context = useContext(CartBurguerContext)

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error("useCartBurguerContext was used outside of its Provider");
  }


  return context
}
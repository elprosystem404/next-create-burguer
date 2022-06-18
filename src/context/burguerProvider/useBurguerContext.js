import { useContext } from "react"
import { BurguerContext } from "./index.js"


export const useBurguerContext = () => {

  const context = useContext(BurguerContext)

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error("useBurguerContext was used outside of its Provider");
  }

  return context
}
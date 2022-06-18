import { useContext } from "react"
import { BurguerContext } from "./index.js"
import { BurguerDisplayContext } from "./index.js"


export const useBurguerDisplayContext = () => {

  const context = useContext(BurguerDisplayContext)

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error("useBurguerDisplayContext was used outside of its Provider");
  }

  return context
}
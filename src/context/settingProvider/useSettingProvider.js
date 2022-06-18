import { useContext } from "react"
import { SettingBurguerContext } from "./index.js"


export const useSettingBurguerContext = () => {

  const context = useContext(SettingBurguerContext)

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error("useSettingBurguerContext was used outside of its Provider");
  }


  return context
}

import { EnabledBase } from "../../../../types.d.js"

import { elog } from "../../../utils/helpers.js"
import { _initialize } from "./initialize.js"



// ......................................
////  enableds Burguer based
// ......................................

/**
 * @param {string} key
 * @param {array} ingredients
 * @param {object} createBurguer
 * @param {string} event
 * @returns {EnabledBase}
 */
export const createEnabledbased = (
  key,
  ingredients,
  createBurguer,
  event
) =>
  _initialize(
    key,
    ingredients,
    createBurguer,
    event
  )



// ......................................
////  enableds Reset  based
// ......................................

export const enabledReset = (
  key,
  ingredients,
  createBurguer,
  event) => _initialize(
    key,
    ingredients,
    createBurguer,
    event
  )



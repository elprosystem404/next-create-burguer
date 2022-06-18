// ......................................
//// app
// ......................................

import { elog } from "../../../utils/helpers.js"
import { ENABLED_BASE } from "../types.js"
import { apply, _isEqual } from "./applyRoles.js"
import { CallBack } from "./callbackRoles.js"
import { Roles } from "./roles.js"






const decrementValue = ({ quantity }) => quantity - 1


const createElementEnabledDec = (
  enabledName, x
) =>
  ENABLED_BASE(x, {
    valueToChange: Roles.quantityNegativeLimit(
      decrementValue(x.enableds[enabledName])),
    event: 'DEC',
    target: 'onChange',
    context: {
      ...x.context,
      current: x.enabledContext(_isEqual(enabledName), 'dec'),
    }
  },
    'createElementEnabledDec'
  )



// ......................................
//// decrement
// ......................................

export const _decrement = (
  ingredientsEnabled,
  enabledName,
) => {

  const enabledDec = createElementEnabledDec(enabledName, ingredientsEnabled)

  return ({
    ...enabledDec,
    enableds: apply[enabledDec.roles.type](enabledDec)
  })
}

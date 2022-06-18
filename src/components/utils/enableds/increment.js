// ......................................
//// app
// ......................................

import { apply, _includes, _isEqual, _enabledContext } from "./applyRoles.js"
import { CallBack } from "./callbackRoles.js"
import { Roles } from "./roles.js"

import { ENABLED_BASE } from "../types.js"
import { elog } from "../../../utils/helpers.js"




const incrementValue = ({ quantity }) => quantity + 1


const createElementEnabledInc = (
  enabledName, x
) =>
  ENABLED_BASE(x, {
    valueToChange: Roles.quantityNegativeLimit(
      incrementValue(x.enableds[enabledName])
    ),
    event: 'INC',
    target: 'onChange',
    context: {
      ...x.context,
      current: x.enabledContext(_isEqual(enabledName), 'inc'),
    }
  },
    'createElementEnabledInc')


// ......................................
//// increment
// ......................................


export const _increment = (
  ingredientsEnabled,
  enabledName,
) => {

  const enabledInc = createElementEnabledInc(enabledName, ingredientsEnabled)

  return ({
    ...enabledInc,
    enableds: apply[enabledInc.roles.type](enabledInc)
  })
}



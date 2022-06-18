import { _enabledContext } from "./src/components/utils/enableds/initialize.js"
import { useInternal, _itemsMap } from "./src/context/createBurguerProvider/utils/index.js"


export const EnabledsItemsBase = {
  itemsId: 0,
  name: '',
  price: 0,
  limit: 0,
  quantity: 0,
  incDisabled: false,
  decDisabled: true
}


export const RolesBase = {
  choices: 0,
  maxchoices: 0,
  itemsInit: 0,
  itemsMap: _itemsMap,// () => ContextBaseProps,
  itemsLimit: 0,
  required: 0,
  order: 0,
  type: '',
  ingredsNames: [],
  ingredsNamesLength: 0
}

export const ContextBaseProps = {
  keys: [],
  values: [],
  length: 0
}

export const ContextBase = {
  current: ContextBaseProps,
  previous: ContextBaseProps,
  others: ContextBaseProps
}

export const EnabledBase = {
  roles: RolesBase,
  valueToChange: 0,
  burguerName: '',
  name: '',
  event: '',
  target: '',
  enableds: { name: EnabledsItemsBase },
  context: ContextBase,
  enabledContext: _enabledContext
}
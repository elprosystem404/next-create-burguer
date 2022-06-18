export const enabledBaseMock = {
  burguerName: "Chicken Honey",
  context: {
    current: {
      keys: [],
      values: [],
      length: 0
    },
    previous: {
      keys: [
        "Integral"
      ],
      values: [
        {
          name: "Integral",
          limit: 1,
          quantity: 1
        }
      ],
      length: 1
    },
    others: {
      keys: [],
      values: [],
      length: 0
    }
  },
  enableds: {
    Integral: {
      name: "Integral",
      limit: 1,
      quantity: 1,
      incDisabled: false,
      decDisabled: true
    },
    American: {
      name: "American",
      limit: 1,
      quantity: 0,
      incDisabled: false,
      decDisabled: true
    },
    Italian: {
      name: "Italian",
      limit: 1,
      quantity: 0,
      incDisabled: false,
      decDisabled: true
    },
    French: {
      name: "French",
      limit: 1,
      quantity: 0,
      incDisabled: false,
      decDisabled: true
    }
  },
  event: "BURGUER_RELOAD",
  name: "Bread",
  roles: {
    choices: 0,
    maxchoices: 1,
    itemsInit: 1,
    itemsLimit: 1,
    required: 1,
    type: "oneToOne",
    itemsMap: {
      keys: [
        "Integral"
      ],
      values: [
        {
          name: "Integral",
          limit: 1,
          quantity: 1
        }
      ],
      length: 1
    },
    ingredsNames: [
      "Bread",
      "Beef"
    ],
    ingredsNamesLength: 2
  },
  target: "initial"
}
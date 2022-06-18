export const burguerMock = {
  id: 8020,
  burgerId: 9,
  cache: true,
  stored: false,
  name: "Stuffed Burguer",
  nameRef: "StuffedBurguer",
  event: "BURGUER_NAME",
  price: 18.2,
  quantity: undefined,
  stored: false,
  subTotal: undefined,
  total: undefined,
  totalIngredients: undefined,
  ingredsNames: [
    "Bread",
    "Beef",
  ],
  itemsMap: 'fn itemsMap',
  differs: 'fn differs',
  withIngredients: 'fn withIngredients',
  ingredsNamesLength: 3,
  ingredients: [
    {
      name: "Bread",
      order: 1,
      required: 1,
      items: [
        {
          itemsId: 1,
          name: "Integral",
          price: 2.5,
          limit: 1,
          quantity: 1,
          incDisabled: false,
          decDisabled: false
        }
      ]
    },
    {
      name: "Beef",
      order: 2,
      required: 1,
      items: [
        {
          itemsId: 5,
          name: "Traditional",
          price: 2.18,
          limit: 3,
          quantity: 1,
          incDisabled: false,
          decDisabled: false
        }
      ]
    }
  ]
}
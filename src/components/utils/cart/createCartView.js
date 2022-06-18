
import { createUUID, elog } from "../../../utils/helpers.js"



// ..........................................................
//// helpers
// ..........................................................


// ......................................
//// update Cart Burguer Base
// ......................................

const updateCartBase = (
  {
    id,
    name,
    price,
    quantity,
    totalIngredients,
    subTotal,
    total
  }
) => ({
  id,
  name,
  price,
  quantity,
  totalIngredients,
  subTotal,
  total,
  ingredients: []
})

const updateCartIngredientsBase = (
  {
    name,
    items
  }
) => ({
  name,
  items: []
})

const updateCartIngredientsItemsBase = (
  {
    name,
    quantity,
    price,
  }
) => ({
  name,
  quantity,
  price
})


// ......................................
////  CART BASE
// ......................................

export const CART_BASE = (cartBurguer, props = {}) => ({
  ...updateCartBase(cartBurguer),
  ...props
})

export const CART_INGREDIENTS_BASE = (ingredients, props = {}) => ({
  ...updateCartIngredientsBase(ingredients),
  ...props
})

export const CART_INGREDIENTS_ITEMS_BASE = (items, props = {}) => ({
  ...updateCartIngredientsItemsBase(items),
  ...props
})




////////////// Totalize Cart Burguer /////////////////


// ......................................
//// totalize Cart Burguer
// ......................................





// ......................................
////   create Items Cart
// ......................................


const createItemsCart = (cart) => {

  return cart.map(aCart => {

    const cartBase = CART_BASE(
      aCart,
      {}
    )

    return {

      ...cartBase,
      ingredients: aCart.ingredients.map(aIngredients => {

        const ingredients = CART_INGREDIENTS_BASE(
          aIngredients,
          {}
        )

        return {
          ...ingredients,
          items: aIngredients.items.map(aItems => {

            const items = CART_INGREDIENTS_ITEMS_BASE(
              aItems,
              {}
            )

            return {
              ...items
            }

          })
        }
      })

    }
  })

}



// ......................................
////   cart Total
// ......................................

const cartTotal = (x) => {

  return x.reduce((acc, prev) => {

    return acc += prev.total
  }, 0)
}




// ......................................
////   totalize cart
// ......................................

const totalizeCartView = (cart) => {

  // cart Total
  const _cartTotal = cartTotal(cart)
  // items Amount
  const _itemsAmount = cart.length

  // cart View
  return (
    {
      cartId: createUUID(),
      cartTotal: _cartTotal,
      itemsAmount: _itemsAmount,
      itemsCart: createItemsCart(cart),//
    }
  )
}



// ......................................
////   totalize Cart View
// ......................................

//  -> cart []  ->  cartView { ... , itemsCart: []}
export const createCartView = (cart) =>
  (cart).length <= 0
    ? {}
    : totalizeCartView(cart)


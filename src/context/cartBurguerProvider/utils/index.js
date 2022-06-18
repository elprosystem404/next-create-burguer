
import { createUUID } from "../../../components/utils/ingredients/activeIngredients.js"
import { checkIndex, concatenating, filtering, itemEqual, itemId, itemName, mapping } from "../../../components/utils/helpers.js"
import { arrayOfProperties, compose, elog, findIndex, propKey, propKeys } from "../../../utils/helpers.js"
import { totalize } from "../../createBurguerProvider/utils/index.js"





// ......................................
//// add Cart
// ......................................




// ......................................
//// update Qty
// ......................................


const updateQty = (
  cartPrevState,
  checkIndexFn
) =>
  cartPrevState.map((item) => checkIndexFn(item.id) >= 0
    // totalize createBurguer
    ? totalize({
      ...item,
      quantity: item.quantity + 1
    })
    : item
  )




// ......................................
//// add  cart Burguer
// ......................................




// ......................................
//// checker Falsy
// ......................................


const checkerFalsy = [{
  id: false,
  equal: false
}]


// ......................................
//// checker Truthy
// ......................................

const checkerTruthy = (id, equal) => ({
  id,
  equal
})


// ......................................
//// checkers
// ......................................

const checkers = (pred, checker) =>
  pred
    ? checker
    : checkerFalsy






// ......................................
//// compare
// ......................................


const every = (a1, a2, key) => key
  ? a1.every((value, index) => value[key] === a2[index][key])
  : a1.every((value, index) => value === a2[index])

const comparing = (a1, a2, key) =>
  a1.length === a2.length && every(a1, a2, key)



// ......................................
//// compare
// ......................................


const compare = (
  cartIngredients,
  ingredientsToAdd
) => {

  // cartIngredients
  const aItems = cartIngredients.map(m => m.items).flat()
  // ingredientsToAdd
  const Items = ingredientsToAdd.map(m => m.items).flat()

  const name = comparing(aItems, Items, 'name')
  const quantity = comparing(aItems, Items, 'quantity')

  return name === true && quantity === true

}



// ......................................
//// compare  names
// ......................................


const compareNames = (
  cartIngredients,
  cartToAddIngredients
) => {

  // cartIngredients
  const aName = cartIngredients.map(m => m.name)
  // cartToAddIngredients
  const bName = cartToAddIngredients.map(m => m.name)

  const names = comparing(aName, bName)

  return names
    ? compare(
      cartIngredients,
      cartToAddIngredients
    )
    : false
}



// ......................................
//// compare Ingredients Names
// ......................................


const compareIngredientsNames = (
  itemsCart,
  cartToAddIngredients
) =>
  itemsCart.map(item =>
    checkerTruthy(
      item.id,
      compareNames(
        item.ingredients,// <- cartIngredients
        cartToAddIngredients)
    )
  )





// ......................................
//// checker
// ......................................

const existEquals = (checker) => checkers(
  checker.length > 0,
  checker)




// ......................................
//// checkers
// ......................................


const checker = createBurgerToAdd => itemsCart =>
  checkers(
    itemsCart.length > 0, // if true, then does not exist in cart
    existEquals(
      filtering(itemEqual) // only equals
        (compareIngredientsNames(
          itemsCart,
          createBurgerToAdd.ingredients)) // cartToAddIngredients
    )
  )


// ......................................
//// compose Checkers
// ......................................



// ......................................
//// is Equal To
// ......................................

const isEqualTo = (ids) => ({
  withIds: ids,
  equalsTo: ids.length > 0
})


// ......................................
//// compose Checkers
// ......................................

const composeCheckers = createBurgerToAdd => compose(
  mapping(itemId),
  filtering(itemEqual),
  checker(createBurgerToAdd) // <- itemsCart
)


// ......................................
//// compose Equals To
// ......................................

const composeEqualsTo = createBurgerToAdd => compose(
  isEqualTo,
  composeCheckers(createBurgerToAdd),
  filtering(
    itemName(createBurgerToAdd.name) // burguerName
  )
) // cartPrevState



// ......................................
//// add Cart
// ......................................

const addCart = (
  cartPrevState,
  createBurgerToAdd,
) => {

  const { withIds, equalsTo } =
    composeEqualsTo(
      createBurgerToAdd)
      (cartPrevState)

  return equalsTo
    ? updateQty(
      cartPrevState,
      checkIndex(withIds)
    )
    : concatenating(
      cartPrevState,
      createBurgerToAdd
    )

}




// ......................................
//// add Cart Burguer
// ......................................

export const addCartBurguer = (
  cartPrevState,
  createBurgerToAdd,
) =>
  // if it is empty add otherwise check if there is the same
  cartPrevState.length <= 0
    ? [createBurgerToAdd]
    : addCart(
      cartPrevState,
      createBurgerToAdd
    )












////////////// Edit Cart Burguer /////////////////

// ......................................
//// setEditCartBurguerContext
// ......................................

// toUpdate -> convertedToCard
export const toUpdate = ({ name, quantity, price, totalIngredients, subTotal, total, ...nextValueUpdate }) => ({
  nextValueTolizers: { name, quantity, price, totalIngredients, subTotal, total },
  nextValueUpdate
})

// removeCartBurguerName
export const removeCartBurguerName = (x, burguerName) => {

  const index = findIndex(x, burguerName)

  return x.filter((_, i) => i !== index)

}

// changeCartBurguer
export const changeCartBurguer = (currentCartBurguer, nextValueTolizers, nextValueUpdate) => {

  const updateCartBurguer = {
    ...nextValueTolizers,
    ...nextValueUpdate
  }

  return ([
    ...currentCartBurguer,
    updateCartBurguer
  ])

}

// editCartBurguer
export const editCartBurguer = (createBurger, cartBurguer) => {

  const convertedToCard = convertToObjectCart(createBurger)

  const { nextValueTolizers, nextValueUpdate } = toUpdate(convertedToCard)
  const { name: burguerName } = nextValueTolizers

  // change currentValueUpdate to nextValueUpdate
  const updateCartBurguer = changeCartBurguer(
    removeCartBurguerName(
      cartBurguer,
      burguerName
    ),
    nextValueTolizers,
    nextValueUpdate)

  return updateCartBurguer

}




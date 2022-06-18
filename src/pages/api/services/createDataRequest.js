import { burguerCustom, burguerRequest, ingredientsJoin } from "./utils.js"
import { elog } from "../../../utils/helpers.js"




// ......................................
////  convert To Burguer
// ......................................

export const convertToBurguer = burgerDataBase => (

  burgerDataBase.map(burger => ({
    burgerId: burger.burger_id,
    price: burger.burger_price,
    name: burger.burger_name,
    nameRef: burger.burger_nameRef,
    description: burger.burger_description,
    ounces: burger.burger_ounces,
    image: burger.burger_image
  }))

)




// ......................................
////  create Burguer Request
// ......................................

export const createBurguerRequest = async () => {

  const burguerResult = await burguerRequest()

  const { data: { rows: burguer, sql }, error, message } = burguerResult

  const createdBurguer = convertToBurguer(burguer)

  return createdBurguer
}





// ......................................
////  create Ingredients Intens
// ......................................


// ......................................
////  convert To Ingred Items Base
// ......................................

export const convertToIngredItemsBase = ({
  items_id: itemsId,
  ingredients_id: ingredientsId,
  items_name: name,
  items_image: itemsImage,
  items_quantity: quantity,
  items_price: price,
  items_limit: limit,
  items_active: active
}) => ({
  itemsId,
  ingredientsId,
  name,
  itemsImage,
  quantity,
  price,
  limit,
  active
})



const createIngredientsIntens = (x, name) => x.reduce((acc, ingred) =>
  ingred.ingredients_name === name
    ? (
      [...acc,
      convertToIngredItemsBase(ingred)
      ]
    )
    : acc
  , [])


// ......................................
////  convert To Ingred Items Base
// ......................................

export const convertToIngredBase = ({
  ingredients_id: ingredientsId,
  ingredients_name: name, //ingredientsName,
  ingredients_image: ingredientsImage,
  ingredients_choices: choices,
  ingredients_maxchoices: maxchoices,
  ingredients_items_init: itemsInit,
  ingredients_items_limit: itemsLimit,
  ingredients_required: required,
  ingredients_order: order,
  // ingredientsItems:
}) => ({
  ingredientsId,
  name, // ingredientsName,
  ingredientsImage,
  choices,
  maxchoices,
  itemsInit,
  itemsLimit,
  required,
  order
})






// ......................................
////  convert To Ingredients
// ......................................


export const convertToIngredients = x => {

  // identify how many ingredient names
  const ingredientsName = x.map(m => m.ingredients_name)
  // eliminate duplicates
  const namesWithoutRepetition = ingredientsName.filter((c, index) => ingredientsName.indexOf(c) === index)

  // for each name with an ingredient with all ingredients referring items
  return namesWithoutRepetition.map((name) => {

    // filters the array for each name and takes the first one
    const ingredient = x.filter(f => f.ingredients_name === name)[0]

    // for each first ingredient includes all ingredients items with the related name
    const ingredients = ({
      ...convertToIngredBase(ingredient),
      ingredientsItems: createIngredientsIntens(x, ingredient.ingredients_name)
    })

    return (
      ingredients
    )

  })

}



// ......................................
////  create Ingredients Request
// ......................................


export const createIngredientsRequest = async () => {

  const ingredientsResult = await ingredientsJoin(
    {
      schema: { table: 'ingredients' },
      join: [
        {
          table: 'ingredientsitems',
          on: [{ items_id: 'ingredients_id' }]
        }
      ]
    }
  )

  const { data: { rows: ingredients, sql }, error, message } = ingredientsResult

  const createdIngredients = convertToIngredients(ingredients)

  return createdIngredients
}


  // const customResult = await burguerCustom(
  //   `SELECT * FROM ingredients INNER JOIN ingredientsitems on ingredients.items_id = ingredientsitems.ingredients_id `
  // )
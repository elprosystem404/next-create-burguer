### burguer

####

```javascript
{
"burguer": [
{
  burger_id: 1,
  burger_price: 10,
  burger_name: "Tradicional",
  burger_nameRef: "Tradicional",
  burger_description: "A receita leva ingredientes tradicionais como pão, carne, bacon, queijo, salada e  molho.",
  burger_ounces: "325g",
  burger_image: "https://descontoshoje.com.br/api/createBurger/upload/burger_tradicional.webp"
},
{
  burger_id: 2,
  ...
}
]

```

### ingredientsActive

#### Representa o estado da view sendo um elemento do array de ingredientes

```javascript
{
ingredients_id: 1,
ingredients_name: "Bread",
ingredients_image: "assets/icon/bread.png",
ingredients_choices: 0,
ingredients_maxchoices: 1,
ingredients_items_init: 1, // -> items_id
ingredients_items_limit: 1,
ingredients_required: 1,
ingredientsItems: [
      {
      items_id: 1,
      ingredients_id: 1,
      items_name: "Integral",
      items_image: "assets/icon/integral_bun.png",
      items_quantity: 0,
      items_price: 2.5,
      items_limit: 1,
      items_active: false
      },
      {
      items_id: 2,
      ...
      }
   ]
}

```

### ingredientsEnabled

#### Representa o estado da view de ingredientes Items para cada ingredientsActive, sendo amarzenado na store pelo nome do ingredientsItems (items_name)

```javascript
{
  // INITIAL_ENABLED_BASE
  "burguerName": "Vegano",
  "name": "Bread",
  "event": "BURGUER_DIFFER",
  "required": 1,
  "order": 1,
  "enableds": {
    "Integral": {
      // INGREDIENTS_ENABLED_BASE
      "ingredientsId": 1,
      "itemsId": 1,
      "name": "Integral",
      "quantity": 1,
      "price": 2.5,
      "limit": 1,
      "disabled": true,
      "incDisabled": true,
      "decDisabled": false
    },
  }
}
```

### burguer Store

#### Representa o estado da view de CreateBurger (required + confirm)

```javascript
{
 // CREATE_BURGUER_BASE
  "id": 7935,
  "burgerId": 2,
  "name": "Vegano",
  "nameRef": "Vegano",
  "event": "BURGUER_DIFFER",
  "price": 14,
  "quantity": 1,
  "totalIngredients": 4.68,
  "subTotal": 18.68,
  "total": 18.68,
  "ingredients": [
    {
      // INITIAL_INGREDIENTS_BASE
      "name": "Bread",
      "order": 1,
      "required": 1,
      "items": [
        {
          // INGREDIENTS_ITEMS_BASE
          "ingredientsId": 1,
          "itemsId": 1,
          "name": "Integral",
          "quantity": 1,
          "price": 2.5,
          "limit": 1,
          "disabled": true,
          "incDisabled": true,
          "decDisabled": false
        }
      ]
    }
]
}
```

### cart burguer Store (Cart View)

#### Representa o estado da view de ShoppingCart

```javascript
{
  "cartId": 6318,
  "cartTotal": 18.68,
  "itemsAmount": 1,
  "itemsCart": [
    {
      "id": 7935,
      "name": "Vegano",
      "price": 14,
      "quantity": 1,
      "totalIngredients": 4.68,
      "subTotal": 18.68,
      "total": 18.68,
      "ingredients": [
        {
          "name": "Bread",
          "items": [
            {
              "name": "Integral",
              "quantity": 1,
              "price": 2.5
            }
          ]
        },
        {
          "name": "Beef",
          "items": [
            {
              "name": "Traditional",
              "quantity": 1,
              "price": 2.18
            }
          ]
        }
      ]
    }
  ]
}

```

### Rules

| Rules | Check | Funcionalidades Testadas                                                                 |
| ----- | ----- | ---------------------------------------------------------------------------------------- |
| 01    | OK    | 1º enter -> criar estado com inde                                                        |
| 02    | OK    | reload page -> manter o estado                                                           |
| 03    | OK    | 2º enter com o mesmo burguer -> manter o estado                                          |
| 04    | OK    | 2º enter com o outro burguer -> criar estado com index 0                                 |
| 05    | OK    | confirm -> atualizar createBurguer                                                       |
| 06    | OK    | clear sem confirm -> zerar valores da view ativa                                         |
| 07    | OK    | clear com confirm -> apagar createBurguer somente da view ativa e zerar valores da ativa |
| 08    | OK    | clear sem existir em createBurguer -> não fazer                                          |
| 09    | OK    | clear all -> apagar createBurguer mantendo os requeridos e atualizar a view              |
| 10    | OK    | check no ingredientes com confirm                                                        |
| 11    | OK    | incremente / decremente                                                                  |
| 12    | OK    | desabilitar clear dos requeridos                                                         |
| 13    | OK    | desabilitar clear e confirm quando todos zero e habilitar quando não for zero            |
|       |       | mas habilitar clear em casos de exceção (existir em createBurguer e não for requerido)   |
| 14    | OK    | desabilitar decremente quando zero                                                       |
| 15    | OK    | desabilitar incremente quando no limite de items                                         |
| 16    | OK    | desabilitar demais no limite de ingredientes e habilitar quando um dos habilitados zerar |
| 17    | OK    | desabilitar clearAll quando addCart                                                      |
| 18    | OK    | desabilitar shoppingCart quando cart for vázio                                           |

setBurguerStore('burguer', {
"name": "Tradicional", "price": 10, "totalIngredients": 4.68, "subTotal": 14.68,
"quantity": 10000, "total": null,
"ingredients":
[
{
"name": "Bread",
"order": 1,
"required": 1,
"items": [
{ "name": "Integral", "quantity": 100000, "price": 2.5 }
]
},
{
"name": "Beef",
"order": 2,
"required": 1,
"items": [
{ "name": "Traditional", "quantity": 100000, "price": 2.18 }
],
},
{
"name": "Cheese",
"order": 3,
"required": 0,
"items": [
{ "name": "Parmesan", "quantity": 1, "price": 3.5 }
]
}
]
})

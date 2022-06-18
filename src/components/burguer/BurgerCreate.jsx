
// ......................................
////  react/next
// ......................................

import React, { memo, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image';

// ......................................
////  material
// ......................................

import {
  Box, Button, Divider, Paper,
  AppBar, Badge, Toolbar, Typography, Grid,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';



// ......................................
////  app
// ......................................

import { useCreateBurguerContext } from '../../context/createBurguerProvider/useCreateBurguerContext.js'
import { useCartBurguerContext } from '../../context/cartBurguerProvider/useCartBurguerContext.js';
import BurguerCounter from './BurguerCounter.jsx';
import { elog } from '../../utils/helpers.js';








// ......................................
////  Burguer Settings
// ......................................



const BurguerSettings = ({ createBurguer, burguerQty, children: Quantity }) => {


  const { id, name, price, ...mRest } = createBurguer


  const headMain = {
    Code: id,
    Burguer: name,
    Price: price,
    Quantity: burguerQty,
  }

  const {
    totalIngredients,
    subTotal,
    total,
    ingredients: _ingred,
  } = mRest

  const head = {
    "Total Ingredients": totalIngredients,
    SubTotal: subTotal,
    Total: total
  }

  const ingredients = _ingred.reduce((acc, prev) => ([
    ...acc,
    {
      ingredientName: prev.name,
      items: prev.items
    }
  ])
    , [])




  const headKey = Object.keys(head)
  const headValue = Object.values(head)

  const itemfn = item => {

    const { itemsId, ingredientsId, limit, disabled, ...rest } = item

    return ({
      key: Object.keys(rest),
      value: Object.values(rest)
    })
  }



  const Render = (items) => {

    return items.map(item => {

      const { key, value } = itemfn(item)

      return key.map((k, i) => (

        <ListItem component="span" disablePadding key={k}
          secondaryAction={`${value[i]}`}
          sx={{ color: "#B20303", lineHeight: 3.5 }}
        >

          <ListItemText primaryTypographyProps={{ fontSize: '.75rem', color: "blue" }} primary={`${k}:`} />


        </ListItem>

      ))
    })
  }


  const LoadingIcon = ({ children }) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
      setMounted(true)
    }, [])

    return mounted && children
  }




  return (


    <>

      <Grid id='items' container spacing={{ xs: 1, sm: 1, md: 2 }} >

        <Grid id="grid-head" item xs={6} sm={6} md={6} lg={6}>


          <Box p={2} id="head"
            sx={{ display: 'flex', flexDirection: 'column' }}>


            <List id='list' sx={{ width: '100%', maxWidth: 120 }} disablePadding>

              <ListItem component="span" disablePadding  >

                <ListItemText primaryTypographyProps={{ fontSize: '.75rem', color: "white" }} primary={`Code:`} />
                <ListItemText primaryTypographyProps={{ fontSize: '1rem', color: "yellow" }} primary={`${headMain.Code}`} />&ensp;

              </ListItem>

            </List>

            <ListItemText primaryTypographyProps={{ fontSize: '.75rem', color: "white" }} primary={`${headMain.Burguer}`} />

            <ListItemText primaryTypographyProps={{ fontSize: '1rem', color: "yellow" }} primary={`$ ${headMain.Price}`} />



            <ListItemText primaryTypographyProps={{ fontSize: '.75rem', color: "white" }} primary={`Quantity:`} />
            <ListItemText primaryTypographyProps={{ fontSize: '1rem', color: "yellow" }} primary={`${headMain.Quantity}`} />&ensp;

            {Quantity}

            {headKey.map((key, index) => (

              <ListItem component="span" disablePadding key={key}
                secondaryAction={`${headValue[index]}`}
                sx={{ fontSize: '.9rem', color: "red", lineHeight: 1.5 }}
              >

                <ListItemText primaryTypographyProps={{ fontSize: '.8rem', color: "blue", lineHeight: 1.5 }} primary={`${key}:`} />

              </ListItem>

            )
            )
            }


          </Box>


        </Grid>




        <Grid id="grid-ingredients" item xs={6} sm={6} md={6} lg={6}>

          <Box id="ingredients">

            <List sx={{ width: '100%', maxWidth: 300 }} >
              {
                ingredients.map((ingred) => {
                  return (

                    <Box px={4}
                      key={ingred.ingredientName}>
                      {ingred.ingredientName}
                      {Render(ingred.items)}
                      <Divider sx={{ background: 'white', opacity: .5, margin: '.5rem' }} />
                    </Box>

                  )
                })
              }
            </List>

          </Box>


        </Grid>

      </Grid>

    </>

  )
}




// ......................................
////  Burguer Another
// ......................................


const BurguerAnother = () => {

  return (
    <>
      <Image
        src="/assets/burger_another.webp"
        alt="burger_another"
        width={450}
        height={400}
        blurDataURL='/assets/burger_another.webp'
        placeholder="blur"
      />
    </>
  )
}






// ......................................
////  Burger Create
// ......................................

const BurgerCreate = () => {


  // ......................................
  ////   access the active router
  // ......................................

  const router = useRouter()


  // ......................................
  ////   access the context value
  // ......................................


  // use Create Burguer Context
  const {
    createBurguer,
    reportChangedEvent
  } = useCreateBurguerContext()



  // ......................................
  ////  add To Card
  // ......................................

  const addToCard = (currentCreateBurguer) => {

    // Report to provider  (useCreateBurguerContext)
    reportChangedEvent('ADD',
      currentCreateBurguer)
  }



  // ......................................
  ////  clear All Create Burguer
  // ......................................

  const clearCreateBurguer = (name) => {

    // Report to provider  (useCreateBurguerContext)
    reportChangedEvent('CLEAR', name)
    setQty(1)
  }


  // ......................................
  ////  count
  // ......................................

  // Set the initial count state to zero, 0
  const [qty, setQty] = useState(createBurguer.quantity);


  // ......................................
  ////  upadate Quantity
  // ......................................

  const upadateQuantity = (currentCreateBurguer) => (value) => {

    // Report to provider  (useCreateBurguerContext)
    reportChangedEvent('QTY', {
      ...currentCreateBurguer,
      quantity: value // changes the amount the currentCreateBurguer
    })

    setQty(value)
  }







  // disabledEventAdd
  const disabledEventAdd = createBurguer && createBurguer.event === 'ADD'
    ? true
    : false

  // ShowCreateBurguer
  const ShowCreateBurguer = createBurguer && createBurguer.event === 'ADD'
    ? <BurguerAnother />
    : <BurguerSettings
      burguerQty={qty}
      createBurguer={createBurguer}>

      <BurguerCounter
        burguerQty={qty}
        disabledEventAdd={disabledEventAdd}
        upadateQuantity={upadateQuantity(createBurguer)}
      />

    </BurguerSettings>


  return (

    <>

      <Box sx={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center',
        fontSize: '.75rem',
        backgroundColor: 'black'
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-betwenn', fontSize: '.75rem',
          backgroundColor: 'black'
        }}>

          <Button sx={{ margin: '1rem' }} size="small" variant="contained" startIcon={<DeleteIcon />}
            onClick={() => clearCreateBurguer(
              createBurguer.nameRef,
              createBurguer
            )}
            disabled={disabledEventAdd}
          >
            clear
          </Button>

          <Button sx={{ margin: '1rem' }} size="small" variant="contained" startIcon={<AddShoppingCartIcon />}
            onClick={() => addToCard(
              createBurguer)}
            disabled={disabledEventAdd}
          >
            add
          </Button>

        </Box>

        <Box>

        </Box>

      </Box>


      <Box p={4} sx={{
        display: 'flex', justifyContent: 'space-between'
      }}>

        {createBurguer && ShowCreateBurguer}

      </Box>


      <Box sx={{
        fontSize: '.75rem'
      }}>
        <pre>
          {JSON.stringify(createBurguer, null, 2)}
        </pre>
      </Box>

    </>

  )
}

export default BurgerCreate

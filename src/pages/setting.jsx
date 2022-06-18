// ......................................
////  next/react
// ......................................


import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'



// ......................................
////  material
// ......................................

import { Box, Grid } from '@mui/material'


import BurguerDisplay from '../components/burguer/BurguerDysplay.jsx'
import BurgerCreate from '../components/burguer/BurgerCreate.jsx'
import IngredientsItems from '../components/ingredients/IngredientsItems.jsx'
import ShoppingCart from '../components/cart/shoppingCart.jsx'
import { getQueryStore } from '../utils/store.js'


import { useBurguerContext } from '../context/burguerProvider/useBurguerContext.js'
import { CreateBurguerContextProvider } from '../context/createBurguerProvider/index.js'


import { elog } from '../utils/helpers.js'



// ......................................
////  Setting Page
// ......................................

const Setting = () => {


  // ......................................
  ////  access router
  // ......................................

  const router = useRouter()

  const {
    burguerProvider,
    ingredientsProvider
  } = useBurguerContext()



  // ......................................
  ////  state
  // ......................................

  const [burguerNameRouter, setBurguerNameRouter] = useState(() => {

    const query = getQueryStore('QUERY')
    return query
  })





  // ......................................
  //// side effect
  // ......................................

  useEffect(() => {

    const query = getQueryStore('QUERY')

    setBurguerNameRouter(query)

  }, [burguerNameRouter?.burguerName])




  // ......................................
  ////  side effect  (access page | Refreshing page)
  // ......................................


  useEffect(async () => {

  }, [burguerProvider,
    ingredientsProvider,
    burguerNameRouter
  ])


  return (

    <>

      {
        burguerProvider && ingredientsProvider &&
        <>
          <CreateBurguerContextProvider
            burguer={burguerProvider}
            ingredients={ingredientsProvider}
            burguerNameRouter={burguerNameRouter}

          >

            <Box id='box' p={4} sx={{ display: 'flex' }}>

              <Grid id='items' container spacing={{ xs: 2, sm: 2, md: 2 }} >

                <Grid item xs={6} sm={3} md={2} lg={3}>

                  <Box >
                    <BurguerDisplay />
                  </Box>

                </Grid>

                <Grid item xs={6} sm={6} md={8} lg={6}>

                  <Box >
                    <BurgerCreate />
                  </Box>

                </Grid>

                <Grid item xs={6} sm={3} md={2} lg={3}>

                  <Box >
                    <ShoppingCart />
                  </Box>

                </Grid>

              </Grid>
            </Box>


            <IngredientsItems />

          </CreateBurguerContextProvider>

        </>
      }

    </>

  )
}


Setting.titlePage = 'Create Burguer - Setting'


export default Setting



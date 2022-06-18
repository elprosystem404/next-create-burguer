import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import ShoppingCart from '../components/cart/shoppingCart.jsx'
import { Box, Button } from '@mui/material'


// ......................................
////  ShoppingCartPage
// ......................................


const ShoppingCartPage = () => {


  return (
    <Box sx={{
      fontSize: '.75rem'
    }}>
      <ShoppingCart />
    </Box>
  )
}

ShoppingCartPage.titlePage = 'Create Burguer - Shopping Cart'

export default ShoppingCartPage
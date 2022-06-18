
// ......................................
////  react/next
// ......................................

import React, { forwardRef, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import NextLink from 'next/link';


// ......................................
////  material
// ......................................

import {
  Box, AppBar, Badge,
  Button, IconButton, Toolbar, Typography
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link as MuiLink } from '@mui/material'

// ......................................
////  app
// ......................................

import Footer from './Footer.jsx';
import { useCartBurguerContext } from '../../context/cartBurguerProvider/useCartBurguerContext.js';


import { elog } from '../../utils/helpers.js';
import { Link } from './Link.jsx';



// ......................................
////  Cart Icon
// ......................................

const CartIcon = ({ numOfItemsCart, pathname }) => {


  return (
    (numOfItemsCart > 0 && pathname !== '/shoppingCart')
      ?
      <Box >
        <Badge badgeContent={numOfItemsCart} color="secondary">
          <ShoppingCartIcon sx={{ color: 'white' }} />
        </Badge>
      </Box>
      : null
  )
}


// ......................................
////  layout
// ......................................

const Layout = ({ titlePage, router, children }) => {


  const pathname = router.pathname

  // ......................................
  ////   access the context
  // ......................................

  const {
    amountCartBurguer,
    hasCartBurguer
  } = useCartBurguerContext()



  // ......................................
  ////   state
  // ......................................

  const [
    numOfItemsCart,
    setNumOfItemsCart
  ] = useState(false);

  const amount = amountCartBurguer


  // ......................................
  ////   side effect
  // ......................................

  useEffect(() => {

    setNumOfItemsCart(amount)

  }, [numOfItemsCart, amount]);



  return (
    <>
      <Head>
        <title>{titlePage}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AppBar position="static"
        sx={{ backgroundColor: '#000000' }} >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <NextLink href={`/`} passHref>
            <Typography variant="subtitle1"
              sx={{ flexGrow: 1, cursor: 'pointer' }}  >
              CREATE BURGER - nextjs-material-ui-5
            </Typography>
          </NextLink>

          <NextLink href={`/burguer`} passHref>
            <Typography variant="subtitle1"
              sx={{ flexGrow: 1, cursor: 'pointer' }}  >
              BURGUER
            </Typography>
          </NextLink>


          <NextLink href={`/contact`} passHref>
            <Typography variant="subtitle1"
              sx={{ flexGrow: 1, cursor: 'pointer' }}  >
              CONTACT
            </Typography>
          </NextLink>


          <Link href={`/shoppingCart`} >
            <CartIcon
              numOfItemsCart={numOfItemsCart}
              pathname={pathname} />
          </Link>


        </Toolbar>
      </AppBar>

      {children}
      <Footer />

    </>

  )
}

export default Layout
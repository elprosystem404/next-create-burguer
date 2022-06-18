
// ......................................
////  react/next
// ......................................

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

// ......................................
////  material
// ......................................

import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Paper } from '@mui/material'
import Image from 'next/image'
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


// ......................................
////  app
// ......................................

import { createCartView } from '../utils/cart/createCartView.js';
import { useCartBurguerContext } from '../../context/cartBurguerProvider/useCartBurguerContext.js';


import { elog } from '../../utils/helpers.js';






const myLoader = ({ src, width, quality }) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`
}





// ......................................
////  Cart
// ......................................



const ButtonBack = ({ handleBack }) => {
  return (
    <Box p={4}>
      <Button variant="outlined" startIcon={<ArrowBackIosIcon />} onClick={(e) => handleBack(e)}>
        Back
      </Button>
    </Box>
  )
}



// ......................................
////  Empty Cart
// ......................................

const EmptyCart = () => {

  return (
    <>
      <Image
        // loader={myLoader}
        src="/assets/empty-cart.webp"
        alt="empty-cart.webp"
        width={300}
        height={300}
      />
    </>

  )
}




// ......................................
////  Cart
// ......................................


const Cart = ({ handleBack, clearAllToCart, cartView, cartBurguer }) => {

  return (
    <Box sx={{
      fontSize: '.75rem'
    }}>
      <Box p={4}>

        <Button sx={{ marginInline: '1.25rem' }} size="small" variant="contained" startIcon={<DeleteIcon />}
          onClick={(e) => clearAllToCart(e)}
        >
          clear
        </Button>
        <Button sx={{ margin: '1rem' }} size="small" variant="contained" startIcon={<EditIcon />}
        // disabled={btnEditCart}
        // onClick={() => editToCard(createBurguer)}
        >
          edit
        </Button>
      </Box>

      <Box p={2} sx={{ flexGrow: 1 }}>

        <h3>  Cart View</h3>
        <pre>
          {JSON.stringify(cartView, null, 2)}
        </pre>
        {/* <h3> Cart </h3>
        <pre>
          {JSON.stringify(cartBurguer, null, 2)}
        </pre> */}

      </Box>
    </Box >
  )
}




// ......................................
////  Shopping Cart
// ......................................


const ShoppingCart = () => {


  // ......................................
  ////  access router
  // ......................................

  const router = useRouter()

  const pathname = router.pathname


  // ......................................
  ////   access the context value (useCartBurguerContext)
  // ......................................

  const {
    hasCartBurguer,
    cart,
    amountCartBurguer,
    setCartClearAll,
  } = useCartBurguerContext()




  // ......................................
  ////   state of view
  // ......................................

  const [cartView, setCartView] = useState()


  useEffect(() => {

    const totalize = createCartView(cart)

    setCartView(totalize)

  }, [cart])



  // ......................................
  ////   erase all control state
  // ......................................

  const [clearAll, setClearAll] = useState(false)


  useEffect(() => {
    // clearAll && setClearAll(true)
  }, [cart])


  // ......................................
  ////  clearAllToCart
  // ......................................

  const clearAllToCart = (e) => {

    e.preventDefault()

    setCartClearAll([])
  }



  // ......................................
  ////  handle Back
  // ......................................

  const handleBack = (e) => {
    e.preventDefault()

    router.replace(`/burguer`)
  }



  // ......................................
  ////  has Cart
  // ......................................

  const hasCart = hasCartBurguer()


  return (
    <>
      {pathname === '/shoppingCart' &&
        <ButtonBack
          handleBack={handleBack} />
      }
      {
        hasCart
          ? <Cart
            handleBack={handleBack}
            clearAllToCart={clearAllToCart}
            cartBurguer={cart}
            cartView={cartView}
          />
          : <EmptyCart />

      }
    </>
  )
}



ShoppingCart.titlePage = 'Create Burguer - Shopping Cart'

export default ShoppingCart
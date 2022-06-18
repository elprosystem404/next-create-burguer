
// ......................................
////  react/next
// ......................................

import React, { forwardRef, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import NextLink from 'next/link';


// ......................................
////  material
// ......................................

import { Box, AppBar, Badge, Button, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link as MuiLink } from '@mui/material'

// ......................................
////  app
// ......................................

import Footer from './Footer.jsx';
import { useCartBurguerContext } from '../../context/cartBurguerProvider/useCartBurguerContext.js';


import { elog } from '../../utils/helpers.js';


// https://www.benmvp.com/blog/wrapping-next-link-custom-ui-link-component/

// ......................................
////  Link
// ......................................

const LinkNext = forwardRef(function LinkNext({
  href,
  children,
  prefetch,
  replace,
  scroll,
  shallow,
  locale,
  ...props
},
  ref,
) {

  return (

    <NextLink
      href={href}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      locale={locale}
      passHref
    >
      <a>
        {children}
      </a>

    </NextLink>
  )
})


// https://dev.to/seven/how-to-create-a-preloader-in-nextjs-15n8

export const Link = ({ children, ...props }) => {

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted && <LinkNext
    {...props} >
    {children}
  </LinkNext>

}
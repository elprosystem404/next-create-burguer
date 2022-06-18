
// ......................................
////  react/next
// ......................................

import * as React from 'react';
import { useEffect, useState } from "react";
import Link from 'next/link'
import Image from "next/image"


// ......................................
////  material
// ......................................

import {
  Box, Typography, Grid,
  Paper, Button, Stack,
  IconButton, Container
} from '@mui/material';


// ......................................
////  app
// ......................................

import { useBurguerContext } from '../context/burguerProvider/useBurguerContext.js';
import {
  convertToBurguer,
  createBurguerRequest,
  createIngredientsRequest
} from './api/services/createDataRequest.js';

import { elog } from '../utils/helpers.js';




// ......................................
////  Image Link
// ......................................

const ImageLink = () => {
  return (
    <Image
      src="/assets/images.webp"
      alt="images"
      width={800}
      height={500}
      //  layout='fill'
      objectFit="cover"
      blurDataURL="/assets/images.webp"
      placeholder="blur" />
  )
}

// ......................................
////  Home page
// ......................................

export default function Home({
  burguer, ingredients
}) {

  //   throw new Error(``);


  // ......................................
  ////  access contex
  // ......................................

  const {
    setBurguer,
  } = useBurguerContext()


  // ......................................
  //// side effect
  // ......................................

  useEffect(() => {
    setBurguer({
      burguer,
      ingredients
    })

  }, [])


  return (
    <>
      <Box p={2} >

        <Grid container spacing={4}>

          <Grid
            item xs={12} sm={12} md={12} lg={12} xl={12} >

            <Box id='1' p={2} sx={{
              display: 'flex',
              justifyContent: 'center',
              cursor: 'pointer'
            }}>

              <Link href="/burguer" passHref>
                <a>
                  <ImageLink />
                </a>
              </Link>

            </Box>

          </Grid>


        </Grid>

        <pre>
          {JSON.stringify({ burguer, ingredients }, null, 2)}
        </pre>
      </Box>

    </>


  )
}

Home.titlePage = 'Create Burguer - Home'


export async function getStaticProps() {

  try {

    // request ingredients
    const createdIngredients = await createIngredientsRequest()

    // request burguer
    const createdBurguer = await createBurguerRequest()

    return {
      props: {
        burguer: createdBurguer,
        ingredients: createdIngredients
      }
    };
  } catch (e) {
    console.log('[error]  getStaticProps......', e);
    return {
      props: {
        burguer: false,
        ingredients: false
      }
    }
  }

}




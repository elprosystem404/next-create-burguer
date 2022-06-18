
// ......................................
////  material
// ......................................

import * as React from 'react';
import { useEffect, useState } from "react";

import Image from "next/image"
import { useRouter } from 'next/router';

// ......................................
////  material
// ......................................

import { Box, Typography, Grid, Paper, Button, Stack, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';


// ......................................
////  app
// ......................................

import { useBurguerContext } from '../context/burguerProvider/useBurguerContext.js';
import { getBurguerStore, getQueryStore, setQueryStore } from '../utils/store.js';
import { BURGUER_NAME_REF } from '../components/utils/types.js';


import { elog } from '../utils/helpers.js';





// ......................................
////   burguer page
// ......................................

const Burguer = () => {


  // ......................................
  //// access router
  // ......................................

  const router = useRouter()


  // ......................................
  //// current Burguer store
  // ......................................



  const { currentBurguer, event } = getQueryStore('QUERY')


  // ......................................
  ////  access context
  // ......................................

  const {
    burguerProvider: burguer,
    ingredientsProvider: ingredients
  } = useBurguerContext()


  // ......................................
  ////  handle Current Burguer
  // ......................................

  const handleCurrentBurguer = (selected, current) => {

    // create query
    const query = {
      currentBurguer: selected,
      event: selected === current
        ? 'BURGUER_EQUAL'
        : 'BURGUER_DIFFER'
    }


    // ......................................
    //// set Store query
    // ......................................

    setQueryStore('QUERY', query)



    // ......................................
    //// router push -> setting
    // ......................................

    router.push({
      pathname: `/setting`,
      query: { pid: 'burguer' }
    },
      '/setting',
      { shallow: true }
    )
  }


  // ......................................
  //// Loading Icon
  // ......................................

  const LoadingIcon = ({ name, currentBurguer }) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
      setMounted(true)
    }, [])

    return mounted && name === currentBurguer && <CheckIcon />
  }

  return (
    <>

      <Box id='box' px={4} >
        <Grid container spacing={2}>

          {burguer && (
            burguer.map((item) => (

              <Grid key={item.burgerId.toString()}
                item xs={12} sm={6} md={4} lg={4} xl={4} >

                <Box py={1} px={4}>
                  <Stack
                    direction={"row"} alignItems={"center"} spacing={2}
                  >
                    <Button
                      onClick={() => handleCurrentBurguer(
                        item[BURGUER_NAME_REF],
                        currentBurguer
                      )}>
                      {item.name}
                    </Button>
                    <LoadingIcon
                      name={item[BURGUER_NAME_REF]}
                      currentBurguer={currentBurguer}
                    />
                  </Stack>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={60}
                    layout='responsive'
                    blurDataURL={item.image}
                    placeholder="blur"
                  ></Image>

                </Box>

              </Grid>

            ))
          )
          }
        </Grid>

        {/* <pre>
          {JSON.stringify({ burguer, ingredients }, null, 2)}
        </pre> */}
      </Box>

    </>


  )
}

Burguer.titlePage = 'Create Burguer - Burguer'

export default Burguer


















// ......................................
////  react/next
// ......................................

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'


// ......................................
////  material
// ......................................

import { Box, Button, Card, CardActionArea, CardContent, Drawer, Typography } from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';


// ......................................
////  app
// ......................................

import { useCreateBurguerContext } from '../../context/createBurguerProvider/useCreateBurguerContext.js';
import { BURGUER_NAME_REF, TIME_STAMP } from '../utils/types.js';
import { BurguerDisplayContextProvider } from '../../context/burguerDisplay/index.js';
import { useBurguerDisplayContext } from '../../context/burguerDisplay/useBurguerDisplayContext.js';
import { elog } from '../../utils/helpers.js';




// const styles = {
//   burguer: {
//     link: (theme) => ({
//       color: theme.palette.error.danger
//     })
//   },
// };


const CustomLink = ({ item }) => {

  return (

    <a >
      <Image
        src={item.image}
        alt={item.name}
        width={240}
        height={210}
        layout='responsive'
        blurDataURL={item.image}
        placeholder="blur"
      ></Image>
    </a>
  )
}


const CardBurguer = ({ singleBurguer }) => {


  return (

    <Card sx={{
      maxWidth: 250, flexDirection: 'column',
      alignItems: 'center',
    }}>
      <CardActionArea sx={{ padding: '1rem' }}>
        <Image
          src={singleBurguer.image}
          alt={singleBurguer.name}
          width={'100%'}
          height={'80%'}
          layout='responsive'
          blurDataURL={singleBurguer.image}
          placeholder="blur"
        ></Image>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {singleBurguer.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {singleBurguer.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}


const BurguerAnother = () => {

  return (

    <Card sx={{
      maxWidth: 250, flexDirection: 'column',
      alignItems: 'center',
    }}>
      <CardActionArea sx={{ padding: '1rem' }}>
        <Image
          src="/assets/burger_another.webp"
          alt="burger_another"
          width={'100%'}
          height={'80%'}
          layout='responsive'
          blurDataURL="/assets/burger_another.webp"
          placeholder="blur"
        ></Image>
        <CardContent>
          <Typography variant="h6" component="div">
            Click on

            <Typography variant="body2" color="text.secondary">
              change burger
            </Typography>

            And choose another delicious burguer
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            Click on change burger and choose another delicious burguer
          </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>


  )
}



// ......................................
////  Single Image Card
// ......................................

const SingleImageCard = () => {

  const {
    createBurguer
  } = useCreateBurguerContext()

  const {
    currentBurguer
  } = useBurguerDisplayContext()

  const imageBurguerEvent = createBurguer.event === 'ADD'
    ? <BurguerAnother />
    : <CardBurguer singleBurguer={currentBurguer} />

  return (
    <>
      {
        imageBurguerEvent
      }
    </>
  )
}


// ......................................
////  DrawerList
// ......................................


const DrawerList = () => {

  const {
    toggleDrawer,
    toggleDisplayBurguerName,
    burguer,
    // open -> current, chick -> new, set -> current
    isToggleDisplayBurguerName,
    // open -> current, chick -> old, set -> current
    burguerNameRouter
  } = useBurguerDisplayContext()


  const {
    reportChangedEvent,
    createBurguer,
    // open -> zero, chick -> new, set -> zero
    changedEvent
  } = useCreateBurguerContext()

  const currentBurguer = changedEvent.event === 'BURGUER_NAME'
    ? changedEvent.value
    : burguerNameRouter


  // inform Contex that Burguer Name has been changed
  const BurgerNameChanged = (newBurguerName, burguerEvent) => (event) => {



    // Do not activate the change if the click is on currentBurguer
    const isDif = currentBurguer !== newBurguerName
    const done = isDif
      ? true
      : burguerEvent === 'ADD'
        ? true
        : false

    // Report to provider (useCreateBurguerContext)
    done && reportChangedEvent(
      'BURGUER_NAME',
      newBurguerName,
      createBurguer)


    // Report to provider (useBurguerDisplayContext)
    done && toggleDisplayBurguerName(newBurguerName)
  }





  const burguerEvent = createBurguer.event
  const burguerAddEvent = burguerEvent === 'ADD'


  return (
    <>
      <Card sx={{
        maxWidth: 350, backgroundColor: 'black'
      }}
        onClick={toggleDrawer(false)}
      //  onKeyDown={toggleDrawer(false)}
      >
        <List sx={{ width: '100%', padding: '1rem' }}>
          {
            burguer.map((item) => (

              <ListItem alignItems="flex-start"
                key={item.burgerId.toString()}
                onClick={BurgerNameChanged(
                  item[BURGUER_NAME_REF],
                  burguerEvent)}
                sx={{
                  alignItems: 'center', padding: 1,
                  opacity: item[BURGUER_NAME_REF] === currentBurguer
                    ? burguerAddEvent
                      ? 1
                      : 0.2
                    : 1
                }}>

                <ListItemAvatar >
                  <Avatar alt={item.name} src={item.image} />
                </ListItemAvatar>

                <Typography
                  sx={{ display: 'flex', alignItems: 'center', }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {item.name}
                </Typography>

              </ListItem>

            ))

          }
        </List>
      </Card>

    </>


  )
}



// ......................................
////  MuiDrawer
// ......................................

const BurguerDrawer = () => {

  const { isDrawerOpen, toggleDrawer } = useBurguerDisplayContext()


  return (

    <>
      <Drawer
        anchor='left'
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <DrawerList />
      </Drawer>
      <Box>
        <Button onClick={toggleDrawer(true)}>
          change burger
        </Button>
      </Box>

    </>
  )
}



// ......................................
//// Burguer Display
// ......................................

const BurguerDisplay = () => {

  const {
    createBurguer,
    burguer
  } = useCreateBurguerContext()



  return (
    <>
      {
        createBurguer &&

        <Box p={2} sx={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', backgroundColor: 'black'
        }}>

          <BurguerDisplayContextProvider
            burguer={burguer}
            burguerNameRouter={createBurguer.nameRef}>

            <SingleImageCard />

            <BurguerDrawer />

          </BurguerDisplayContextProvider>

        </Box>

      }

    </>
  )
}

export default BurguerDisplay
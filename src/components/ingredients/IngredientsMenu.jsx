
// ......................................
////  material
// ......................................

import { Avatar, Box, Typography, keyframes, Checkbox, Grid } from '@mui/material'
import React, { memo, useEffect, useMemo, useState } from 'react'
import CheckIcon from '@mui/icons-material/Check';


// ......................................
////  app
// ......................................

import { getNames, hasCookies } from '../utils/helpers.js';
import { useCreateBurguerContext } from '../../context/createBurguerProvider/useCreateBurguerContext.js';
import { elog } from '../../utils/helpers.js';






const fadeInUp = keyframes`
 	0% {
		opacity: 0;
		transform: translateY(100px);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
`;


const scale = keyframes`
   0% {
    -webkit-transform: scale(0.5);
            transform: scale(0.5);
  }
  100% {
    -webkit-transform: scale(2);
            transform: scale(2);
  }
`;


const styles = {
  ingredients: {
    display: 'flex',
    justifyContent: 'space-between',
    avatar: {
      margin: '.5rem',
    },
    fade: {
      animation: `${fadeInUp} 0.5s `, display: 'flex', alignItems: 'center',
    },
    active: {
      animation: `${scale} 0.6s both`, display: 'flex', alignItems: 'center', justifyContent: 'space-between'
    }
  },
}




// ......................................
////  Icon
// ......................................


const Icon = ({ ingredient }) => {

  const { createBurguer } = useCreateBurguerContext()

  // determines whether cookies exist or is null
  const existCookies = hasCookies(createBurguer)

  const ingredientsNames = existCookies && getNames(createBurguer.ingredients)

  const checkIcon = existCookies &&
    ingredientsNames.includes(
      ingredient.name)

  return (
    <>
      {checkIcon && <CheckIcon color='secondary' />}
    </>
  )

}



// ......................................
////  Ingredients Menu
// ......................................


const IngredientsMenu = ({
  ingredients,
  handleIngredientsActive,
  index,
  initialFade,
}) => {



  return (

    <>
      {
        ingredients && ingredients.map((ingredient) => {
          return (

            <Box mb={2} key={ingredient.ingredientsId.toString()}
              id='ingredients'
              onClick={() => handleIngredientsActive(ingredient.ingredientsId)}
              sx={
                {
                  // Applies the fade effect to the active ingredient only
                  ...(index === ingredient.ingredientsId
                    ? styles.ingredients.active
                    : initialFade === 'initial' && ingredient.ingredientsId === 1
                      ? styles.ingredients.active
                      : styles.ingredients)
                }
              }>
              {

                <Box id='avatar' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar alt={ingredient.name} src={`/${ingredient.ingredientsImage}`}
                    sx={index === ingredient.ingredientsId
                      ? styles.ingredients.fade : styles.ingredients.avatar}
                  />
                  <Box>
                    <Typography> {ingredient.name}</Typography>
                  </Box>
                  <Icon ingredient={ingredient} />
                </Box>


              }
            </Box>

          )
        })
      }
    </>


  )
}

export default IngredientsMenu


/*
 // Applies the fade effect to the active ingredient only
  ...(index === ingredient.ingredientsId
    ? styles.ingredients.active
     : initialFade === 'initial' && ingredient.ingredientsId === 1
       ? styles.ingredients.active
    : styles.ingredients)
*/
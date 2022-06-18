import React, { useEffect, useState } from 'react'
import { Box, Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, keyframes, Grid, Container, Stack, Button, Typography } from '@mui/material'

import { useTheme } from "@mui/material/styles"

import IngredientsItemsAction from './IngredientsItemsAction.jsx';
import IngredientsItemsData from './IngredientsItemsData.jsx';
import IngredientsItemsClearAndConfirm from './IngredientsItemsClearAndConfirm.jsx';
import IngredientsMenu from './IngredientsMenu.jsx';
import { useCreateBurguerContext } from '../../context/createBurguerProvider/useCreateBurguerContext.js';


import { activeIngredients } from '../utils/ingredients/activeIngredients.js';
import { elog } from '../../utils/helpers.js';


import { createEnabledbased, enabledReset } from '../utils/enableds/createEnabled.js';

import { ENABLED_BASE } from '../utils/types.js';
import { _increment } from '../utils/enableds/increment.js';
import { _decrement } from '../utils/enableds/decrement.js';




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
    fade: {
      animation: `${fadeInUp} 0.5s `
    },
    active: {
      animation: `${scale} 0.6s both`
    }
  },
}





// ......................................
////  Ingredients Items
// ......................................



const IngredientsItems = () => {




  // ......................................
  ////   access the theme
  // ......................................

  const theme = useTheme()



  // ......................................
  ////   access the context value
  // ......................................

  const {
    createBurguer,
    ingredients
  } = useCreateBurguerContext()


  // ......................................
  ////  initial state
  // ......................................

  const [ingredientsActive, setIngredientsActive] = useState(false)
  const [ingredientsEnabled, setIngredientsEnabled] = useState(false)



  // ......................................
  //  state (controls the active fade effect)
  // ......................................

  const [index, setIndex] = useState(1)

  const [initialFade, setInitialFade] = useState('initial')



  // ......................................
  ////  side effect  ( initial Ingredients Enabled )
  // ......................................

  useEffect(() => {

    // components/utils
    const {
      currentActive,
      currentActiveName,
      position
    } = activeIngredients(
      index,
      ingredients,
      createBurguer.event
    )

    // set local state
    setIngredientsActive(currentActive)

    // components/utils
    const enableds = createEnabledbased(
      currentActiveName,// <- key
      ingredients,
      createBurguer,
      createBurguer.event
    )

    // only one ingredients Enabled
    setIngredientsEnabled(enableds)

    // changed menu
    setInitialFade(position)

    // changed menu
    setIndex(position)


  }, [createBurguer])



  // ......................................
  ////  side effect  (chanded menu)
  // ......................................

  useEffect(() => {
  }, [
    index,
    initialFade
  ])



  // ......................................
  ////  handle Active Fade
  // ......................................

  // -> index : ingredientsId
  const handleIngredientsActive = index => {

    // components/utils
    const {
      currentActive,
      currentActiveName,
      position
    } = activeIngredients(
      index,
      ingredients,
      'CHANGED_MENU')

    // set local state
    setIngredientsActive(currentActive)

    // components/utils
    const enableds = createEnabledbased(
      currentActiveName,
      ingredients,
      createBurguer,
      'CHANGED_MENU'
    )

    // only one ingredients Enabled
    setIngredientsEnabled(enableds)

    // set local state
    setInitialFade('')

    // set local state
    setIndex(index)
  };


  // ......................................
  ////  increment
  // ......................................

  const increment = (enabledName, ingredName) => {

    const enabledIncremented = _increment(
      ingredientsEnabled,
      enabledName,
    )


    //// set local state
    setIngredientsEnabled(enabledIncremented)
  }


  // ......................................
  ////  decrement
  // ......................................

  const decrement = (enabledName, ingredName) => {


    const enabledDecremented = _decrement(
      ingredientsEnabled,
      enabledName
    )


    // set local state
    setIngredientsEnabled(enabledDecremented)
  }



  // ......................................
  ////  reset
  // ......................................

  const reset = (enabledName) => {

    // components/utils
    const enabledZeroed = enabledReset(
      enabledName,
      ingredients,
      createBurguer,
      'RESET'
    )
    // set local state
    setIngredientsEnabled(enabledZeroed)
  }




  //  render -> Determines which 'ingredientsEnabled' will be passed to Ingredients Items Action' component
  const ingredientsEnabledName = (
    ingredientsEnabled
  ) => (
    ingredientsItem) => {

      const itemsName = ingredientsItem.name

      const enableds = {
        ...ENABLED_BASE(ingredientsEnabled, {
          enableds: ingredientsEnabled.enableds[itemsName]
        })
      }

      return (
        <IngredientsItemsAction
          ingredientsEnabled={enableds}
          increment={increment}
          decrement={decrement}
        />
      )
    }


  return (

    <>
      {
        ingredientsEnabled && ingredientsActive &&

        <Grid container spacing={2}>

          <Grid item xs={12}>
            <Box mx={4} p={4} sx={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
            }}>

              <IngredientsMenu
                ingredients={ingredients}
                index={index}
                initialFade={initialFade}
                handleIngredientsActive={handleIngredientsActive}>
              </IngredientsMenu>
            </Box>

          </Grid>



          <Grid item xs={12}>

            <IngredientsItemsData
              ingredientsActive={ingredientsActive}
              render={ingredientsEnabledName(ingredientsEnabled)}
            >
              <IngredientsItemsClearAndConfirm
                ingredientsEnabled={ingredientsEnabled}
                reset={reset}
              >
              </IngredientsItemsClearAndConfirm>

            </IngredientsItemsData>

          </Grid>


          <Box p={4}>
            <h5>ingredientsEnabled</h5>
            <pre>
              {JSON.stringify(ingredientsEnabled, null, 2)}
            </pre>
          </Box>
          <Box>
            <h5>ingredientsActive</h5>

            <pre>
              {JSON.stringify(ingredientsActive, null, 2)}
            </pre>
          </Box>


        </Grid >

      }

    </>
  )
}

export default IngredientsItems



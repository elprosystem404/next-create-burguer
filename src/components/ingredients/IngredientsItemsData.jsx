import React, { memo } from 'react'
import { Avatar, Box, Typography, keyframes, Container, List, ListItem, ListItemAvatar, ListItemText, Button } from '@mui/material'

import { elog } from '../utils/helpers.js';


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
////  Ingredients Items Data
// ......................................



const IngredientsItemsData = ({
  ingredientsActive,
  render,
  children
}) => {

  return (

    <Container maxWidth="sm">

      {
        ingredientsActive && ingredientsActive.ingredientsItems &&
        <List sx={{
          width: '100%', maxWidth: 560,
        }}>
          {
            ingredientsActive.ingredientsItems.map(ingredientsItem => {

              return (
                <ListItem key={ingredientsItem.itemsId.toString()}
                  secondaryAction={render(ingredientsItem)} // <- IngredientsItemsAction
                >

                  <ListItemAvatar>
                    <Avatar sx={styles.ingredients.fade}
                      alt={ingredientsItem.name}
                      src={`/${ingredientsItem.itemsImage}`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={ingredientsItem.name}
                    secondary={ingredientsItem.price} />
                </ListItem>
              )
            })
          }
        </List>
      }

      <Box m={6} p={2}
        sx={{ display: 'flex', justifyContent: 'center' }}>
        {children}
      </Box>


    </Container>


  )
}

export default IngredientsItemsData







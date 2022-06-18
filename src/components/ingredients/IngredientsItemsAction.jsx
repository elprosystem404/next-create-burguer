import React, { memo, useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { Box, Button, Container, Stack } from '@mui/material';
import { elog } from '../../utils/helpers.js';






// ......................................
////  Ingredients Items Action
// ......................................



export const IngredientsItemsAction = ({
  increment,
  decrement,
  ingredientsEnabled
}
) => {

  const {
    name,
    quantity,
    incDisabled,
    decDisabled
  } = ingredientsEnabled.enableds

  const ingredName = ingredientsEnabled.name

  return (
    <>
      <Container maxWidth="sm">

        < Stack direction="row" spacing={2}>

          <Button size="small" variant="outlined" startIcon={<RemoveIcon />}
            onClick={() => decrement(name, ingredName)}
            disabled={decDisabled}
          >
            {/* {`${'decrement'}`} */} decrement

          </Button>

          <Box px={1} sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            backgroundColor: 'black', color: 'white', borderRadius: '15%'
          }}>
            {quantity}
          </Box>

          <Button size="small" variant="contained" endIcon={<AddIcon />}
            onClick={() => increment(name, ingredName)}
            disabled={incDisabled}
          >
            {/* {`${'increment'}`} */} increment
          </Button>

        </Stack>


      </Container >

    </>

  )
}

export default IngredientsItemsAction
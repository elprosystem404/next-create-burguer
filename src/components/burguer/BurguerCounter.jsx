
// ......................................
////  react/next
// ......................................

import React, { useEffect, useState } from 'react'



// ......................................
////  material
// ......................................

import {
  Box, Button, Card,
  CardActionArea, CardContent,
  Container, IconButton, Stack, Typography
}
  from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ReplayIcon from '@mui/icons-material/Replay';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


import { elog } from '../../utils/helpers.js';


// ......................................
////  Burguer Counter
// ......................................


const BurguerCounter = ({
  disabledEventAdd,
  upadateQuantity,
  burguerQty
}) => {


  // Set the initial count state to zero, 0
  const [count, setCount] = useState(burguerQty);
  const [qty, setQty] = useState(burguerQty);


  useEffect(() => {
  }, [count, qty]);



  // Create handleIncrement event handler
  const handleIncrement = () => {

    setCount(prevCount => prevCount + 1);
  };

  // Create handleDecrement event handler
  const handleDecrement = () => {
    setCount(prevCount => {
      const value = prevCount === 1 ? 1 : prevCount - 1
      return value
    })
  };

  // Create handleReset event handler
  const handleReset = (e, count) => {
    e.preventDefault()

    const done = count === 1 ? false : true
    done && setCount(1)
  };

  // Create handle Submit event handler
  const handleSubmit = (e, qty, count) => {
    e.preventDefault()

    setQty((prevQty) => {

      const done = qty === count ? false : true

      done && upadateQuantity(count)

      return done
        ? count
        : prevQty
    })
  };


  return (
    <>


      < Stack direction="row" spacing={1} justifyContent="center">


        <IconButton color="primary" aria-label="decrement" component="span"
          onClick={() => handleDecrement()}>
          <RemoveIcon />
        </IconButton>

        <Box p={1} sx={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          backgroundColor: 'black', color: 'white', borderRadius: '15%', fontSize: '.75rem'
        }}>
          {count}
        </Box>



        <IconButton color="primary" aria-label="increment" component="span"
          onClick={() => handleIncrement()}>
          <AddIcon />
        </IconButton>


        <IconButton color="secondary" aria-label="restart" component="span"
          onClick={(e) => handleReset(e)}>
          <DeleteForeverIcon />
        </IconButton>


        <IconButton color="primary" aria-label="submit" component="span"
          onClick={(e) => handleSubmit(e, qty, count)}>
          <ReplayIcon />
        </IconButton>


      </Stack>






      {/* <Box sx={{ display: 'flex' }}>

        <Button sx={{ fontSize: '.75rem' }} size="small" variant="outline" >
          Quantity
        </Button>

        <Button sx={{}} size="small" variant="outline" startIcon={<RemoveIcon />}
          onClick={handleDecrement}
          disabled={disabledEventAdd}>
        </Button>

        {count}

        <Button sx={{ margin: '.5rem' }} size="small" variant="outline" startIcon={<AddIcon />}
          onClick={handleIncrement}
          disabled={disabledEventAdd}>
        </Button>

        <Button sx={{ margin: '.5rem' }} size="small" variant="contained" startIcon={<RotateLeftIcon />}
        onClick={handleReset}
        disabled={disabledEventAdd} >
        reset
      </Button>
      </Box> */}
    </>

  )
}

export default BurguerCounter
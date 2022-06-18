import React, { useEffect, useRef, useState } from 'react'
import { Button, Stack } from '@mui/material';

import { useCreateBurguerContext } from '../../context/createBurguerProvider/useCreateBurguerContext.js';

import { elog } from '../../utils/helpers.js';




// ......................................
////  zero Quantities
// ......................................


const zeroQuantities = ingredientsEnabled => {

  const quantities = Object.keys(ingredientsEnabled).filter(key => ingredientsEnabled[key]['quantity'] > 0)
  return quantities.length
}


// ......................................
////  disabled
// ......................................

// ingredient name is contained in createBurguer
const disabled = (name, required, withIngredients) =>
  required
    ? true
    : withIngredients
      ? false
      : true





// ......................................
////  Ingredients Items Clear And Confirm
// ......................................


const IngredientsItemsClearAndConfirm = ({
  ingredientsEnabled: localEnabled,
  reset }
) => {

  // ......................................
  //// access context
  // ......................................

  const {
    createBurguer,
    reportChangedEvent
  } = useCreateBurguerContext()

  // ......................................
  ////  confirm
  // ......................................


  const confirm = (
    currentCreateBurguer,
    changedEnabled
  ) =>
    currentCreateBurguer.differs(
      changedEnabled
    ) &&
    // report Event Confirm cases are not the same
    reportChangedEvent('CONFIRM',
      {
        currentCreateBurguer,
        changedEnabled
      })




  // ......................................
  ////  clear unit
  // ......................................

  const clearUnit = (
    currentCreateBurguer,
    { name: nameToClearUnit
    }) =>
    reportChangedEvent('CLEAR_UNIT',
      {
        nameToClearUnit,
        currentCreateBurguer
      })


  // ......................................
  ////  reset Ref
  // ......................................

  const resetRef = (localEnabled) => reset(localEnabled.name)

  // ......................................
  //  zero Quantities
  // ......................................

  const zeroQuantity = ({ enableds }) => zeroQuantities(enableds)



  // ......................................
  //  disabled Clear
  // ......................................


  const disabledClear = ({ name, roles }) => disabled(
    name,
    roles.required,
    createBurguer.withIngredients(name)
  )


  return (
    <>

      {localEnabled &&

        <>
          <Button variant="outlined" size="large"
            sx={{ width: '100%', marginInline: '1.25rem' }}
            onClick={() => resetRef(localEnabled)}
          // disabled={zeroQuantity(localEnabled) === 0}
          >
            reset
          </Button>


          <Button variant="outlined" size="large"
            sx={{ width: '100%', marginInline: '1.25rem' }}
            onClick={() => clearUnit(createBurguer, localEnabled)}
            disabled={disabledClear(localEnabled)}
          >
            clear
          </Button>



          <Button variant="outlined" size="large"
            sx={{ width: '100%', marginInline: '1.25rem' }}
            onClick={() => confirm(createBurguer, localEnabled)}
            disabled={zeroQuantity(localEnabled) === 0}
          >
            confirm
          </Button>
        </>

      }
    </>


  )
}

export default IngredientsItemsClearAndConfirm

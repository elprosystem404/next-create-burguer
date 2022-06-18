import { createContext, useEffect, useMemo, useState } from "react";
import axios from 'axios'
import {
  createBurguerRequest,
  createIngredientsRequest
} from '../../pages/api/services/createDataRequest.js'
import { elog } from "../../utils/helpers.js";


// ......................................
//// create Context
// ......................................



export const BurguerContext = createContext()





// ......................................
//// request Burguer
// ......................................

const requestBurguer = async () => {

  try {

    // request ingredients
    const createdIngredients = await createIngredientsRequest()

    // request burguer
    const createdBurguer = await createBurguerRequest()

    return {
      createdIngredients,
      createdBurguer
    };

  } catch (e) {
    console.log('[error]  requestBurguer......', e);
    return {
      createdIngredients: false,
      createdBurguer: false
    }
  }
}

const existData = (burguerProvider, ingredientsProvider) => {

  const isUndefined = typeof burguerProvider === 'undefined' ||
    typeof ingredientsProvider === 'undefined'

  return !isUndefined // no exist

}

const done = (burguerProvider, ingredientsProvider) => {

  const exist = existData(burguerProvider, ingredientsProvider)

  return exist ? false : true
}





// ......................................
//// Burguer Context Provider
// ......................................


export const BurguerContextProvider = ({ children }) => {


  // ......................................
  //// state
  // ......................................

  const [burguerProvider, setBurguerProvider] = useState()
  const [ingredientsProvider, setIngredientsProvider] = useState()

  // determines whether to fetch
  const fetchRequest = done(burguerProvider, ingredientsProvider)


  // ......................................
  //// side effect
  // ......................................

  useEffect(async () => {

    const controller = new AbortController();

    const {
      createdIngredients,
      createdBurguer
    } = await requestBurguer()

    fetchRequest && setBurguerProvider(createdBurguer)
    fetchRequest && setIngredientsProvider(createdIngredients)

    return () => {
      elog('cancel the request before component unmounts')
      return controller.abort();

    };

  }, [
    fetchRequest
  ])






  // ......................................
  //// set Burguer
  // ......................................

  const setBurguer = ({ burguer, ingredients }) => {

    // log('set Burguer', {
    //   burguer, ingredients
    // })
    setBurguerProvider(burguer)
    setIngredientsProvider(ingredients)
  }


  // ......................................
  ////  Values provided
  // ......................................


  const values = useMemo(() => (
    {
      burguerProvider,
      ingredientsProvider,
      setBurguer
    }
  ), [burguerProvider, ingredientsProvider, setBurguer]);



  return (
    <BurguerContext.Provider
      value={values}>
      {children}
    </BurguerContext.Provider>

  )

}



// ......................................
////  create UUID
// ......................................

import { BURGUER_BASE } from "../components/utils/types.js";


const every = (a1, a2, key) => key
  ? a1.every((value, index) => value[key] === a2[index][key])
  : a1.every((value, index) => value === a2[index])

const comparing = (a1, a2, key) =>
  a1.length === a2.length && every(a1, a2, key)

// // ......................................
// //// compare
// // ......................................

export const compare = (
  itemsMap,
  ctx
) => {

  const name = comparing(itemsMap.keys, ctx.keys)
  const quantity = comparing(itemsMap.values, ctx.values, 'quantity')

  return name === true && quantity === true

}


const generateUUID = () => {

  const min = Math.ceil(1);
  const max = Math.floor(100000);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const createUUID = (id) => id ? id : generateUUID()


export const everyTruthy = (args) => args.every(arg => arg === true)
export const everyFalsy = (args) => args.every(arg => arg === false)


export const removeProp = p => ({ [p]: remove, ...rest }) => rest
export const removeProps = props => x => (props).reduce((acc, prop) => acc = removeProp(prop)(acc), x)
export const def = x => typeof x !== 'undefined' && x !== null
export const arrayOfProperties = o => Object.keys(o).map(m => ({ [m]: o[m] }))
export const propKeys = obj => def(obj) ? Object.keys(obj) : []
export const propKey = obj => propKeys(obj)[0]

export const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);

export const transduce = (xform, fnReduce, initial, input) => input.reduce(xform(fnReduce), initial);


export const ingredientsSort = x => x.sort((a, b) => a.order - b.order)

export const findIndex = (x, name) => x.findIndex(f => f.name === name)

export const removeItem = (x, key) => {
  const index = x.findIndex(f => f === key)
  return x.filter((_, i) => i !== index)
}

export const isEmptyObject = (props) =>
  //def(props)
  // ?
  propKeys(props).length === 0
    ? true
    : false
// : true

const everyProps = (obj, props, src) => {
  if (Object.keys(props).every(key => propInObject(obj, key))) {
    return props
  }
  throw new Error(`[internal] unknown properties were provided from (${src})`)
}
export const propInObject = (obj, key) => key in obj
export const propsInObject = (obj, props, src) =>
  isEmptyObject(props)
    ? props
    : everyProps(obj, props, src)



const round = (num, places) => {
  return +(parseFloat(num).toFixed(places));
}

export const toFixed2 = (
  quantity,
  totalIngredients,
  subTotal,
  total
) => ({
  quantity: round(quantity, 2),
  totalIngredients: round(totalIngredients, 2),
  subTotal: round(subTotal, 2),
  total: round(total, 2)
})

// // precision
// const round = (num, places) => {
//   if (!("" + num).includes("e")) {
//     return +(Math.round(num + "e+" + places) + "e-" + places);
//   } else {
//     let arr = ("" + num).split("e");
//     let sig = ""
//     if (+arr[1] + places > 0) {
//       sig = "+";
//     }

//     return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + places)) + "e-" + places);
//   }
// }




export const elog = (message, value) => {

  console.log(`

  // ......................................
  ////  ${message.toUpperCase()}
  // ......................................

        `,
    typeof value === 'undefined' ? undefined : value
  )
  console.log(' ')

}

export const tap = src => value => {

  elog('tap', {
    value, src,
  })



  return value
}


const BREAKPOINTS_INT = {
  xs: 375,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};


const customViewports =
  Object.fromEntries(
    Object.entries(BREAKPOINTS_INT).map(([key, val], idx) => {
      return [
        key,
        {
          name: key,
          styles: {
            width: `${val}px`,
            height: `${(idx + 5) * 10}vh`,
          },
        },
      ];
    })
  );


const switchCase = (key, value, x) => {
  const cases = {
    ... (_isEqual(key)(x.current.key) && { current: value }),
    ... (_includes(x.previous.keys)(key) && { previus: value }),
    ... (!_includes(x.previous.keys)(key) &&
      !_isEqual(key)(x.current.key) && { others: value }),

  };
  return cases
};




/*


function _ctx() {
  const items = Object.entries(this.enableds).reduce((acc, [key, val]) =>
    val.quantity > 0
      ? [...acc, val]
      : acc
    , [])
  return callBackEnabledContext(items)
}
export const globalEnabled = {
  e: {}
}
const fn = x => {
  Object.defineProperty(x, 'ctx', { value: _ctx })
  return globalEnabled.e = x
}

*/

// if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //   return;
    // }

// const Functor = (v1) => ({
//   value: v1,
//   map: (fn) => Functor(fn(v1))
// })
// const fn = (x) => x * 2
// const { value } = Functor(10).map(fn)



// const Thing = value =>
// ({
//   value,
//   map: morphism => Thing(morphism(value)),
//   flatMap: morphism => morphism(value)
// })

// const thing1 = Thing(1) //=> Thing (1)
// const thing2 = thing1.flatMap(x => Thing(x + 1)) //=> Thing (2)




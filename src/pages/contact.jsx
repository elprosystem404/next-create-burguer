import React from 'react';


// ......................................
////  material
// ......................................

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {
  Box, AppBar, Badge, Button,
  Toolbar, Typography, Divider
} from '@mui/material'

import { IContainer, _useInternal } from '../context/createBurguerProvider/utils/index.js';
import { elog } from '../utils/helpers.js'
import { useRouter } from 'next/router.js';

// https://dev.to/seven/how-to-create-a-preloader-in-nextjs-15n8

// ......................................
////  Contact page
// ......................................

const Contact = () => {


  elog('contact', 'contact')

  return (

    <div> Contact Page</div>
  )
}

export default Contact



/*

defineProperty

  const obj = {
    name: 'elpro'
  }
  Object.defineProperty(obj, 'yes', { value: function () { return this.name.toUpperCase() } })

  elog('contact', obj.yes())


  // https://www.youtube.com/watch?v=hLgUTM3FOII

  ////  Set

  const arr = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
  const mySet = new Set(arr)

  // mySet.add(6)
  // mySet.delete(1)
  // mySet.clear()
  // mySet.has(1)
  // mySet.size
  //  const backArr = [...mySet]

  // const a = mySet.forEach((value, valueAgain, mySet) => {
  //   return value
  // });


  ////  Map

  // const myMap = new Map([
  //   ['name', 'jonh'], ['surname', 'Doe']
  // ])



  const myMap = new Map([['name', 'elpro'], ['surname', 'system']])

  // myMap.set('development', 'javascript')
  // myMap.delete('surname')
  // myMap.clear()
  //  myMap.has('name')
  //  myMap.size
  // myMap.keys()
  // myMap.values()
  //  myMap.entries()
  // myMap.get('getData')
  // Object.fromEntries(myMap)
  console.log(myMap);

  const userInfo = new Map([
    ['name', "Mayank"],
    ['age', 30],
    ['salary', 10000],
    ['designation', "Developer"],
    ['items', []],
    ['getData', function (name) {
      console.log(name)
      return userInfo.get('age') // or this
    }]
  ])

  // const fn = userInfo.get('getData')
  // const boundFn = fn.bind(userInfo)

  const swapMap = Array.from(userInfo).reduce((acc, [key, value]) => {
    acc.set(key, value)
    return acc
  }, new Map())

  console.log('swapMap....', swapMap);



  //////////////////



  const userInfo = {
    name: "Mayank",
    age: 30,
    salary: 10000,
    designation: "Developer",
    getData: function () {
      alert(this.name);
    }
  }

  // const user = { age: { value: 21 } }
  // const newObject = Object.create(userInfo, user);

  const newObject = Object.create(userInfo);

  // const newObject = Object.setPrototypeOf(user, userInfo)

  console.log(descriptor)



  https://www.javascripttutorial.net/javascript-object-properties/

 [[Configurarable]] – determina se uma propriedade pode ser redefinida ou removida via deleteoperador.
 [[Enumerable]]     – indica se uma propriedade pode ser retornada no for...inloop.
 [[Writable]]       – especifica que o valor de uma propriedade pode ser alterado.
 [[Value]]          – contém o valor real de uma propriedade.

   Object.defineProperty(newObject, 'elpro', {
     configurable: true,
     Enumerable: true,
     Writable: true,
     value: 'system'
   });

   const descriptor = Object.getOwnPropertyDescriptor(newObject, 'elpro');







////////////////////////////////


// const Container = {
//   value: {}
// }

// export const _useInternal = () => Container.value

// Container.value = ({
//   ...initialized,
//   ...internal
// })
// console.log('Icontainer', Icontainer);


////  prototype

// function Person(val) {
//   this.obj = val
// }

// Person.prototype.talk = function () {
//   return this.obj.ingredients
// }


// const PersonProto = new Person(initialized);
// const PersonProto = Object.create(initialized)
// PersonProto. withIngredients() differs() itemsMap()


  //////// bind
  const cat = {
    makeSound: function () {
      elog('make Sound', this.sound)
    },
    talk: 'system',
    getTalk: function () {
      elog('get Talk', this.talk)
    }
  }

  // const talkFn = cat.getTalk
  // talkFn() // undefined
  // const boundFn = talkFn.bind(cat)
  // boundFn()


  // function sumNumbers(firstNumber, secondNumber = 0) {
  //   console.log({
  //     _this: this,
  //     firstNumber,
  //     secondNumber
  //   })
  //   const sum = this + firstNumber + secondNumber;

  //   console.log(sum)
  // }

  // const bindResultFunction = sumNumbers.bind(1, 2, 3)

  // bindResultFunction()



  //////// call

  function sayHello(x) {
    console.log(x + this.name);
  }
  const user1 = {
    name: 'Paula',
    hobby: 'witchcraft'
  }

  // sayHello.call(user1, 'hi, ')

  const kitty = {
    race: 'cat',
    color: 'white',
    greet: function () {
      console.log(this);
      console.log('Hi, I"m a ' + this.race);
    }
  }
  const puppy = {
    race: 'dog',
    color: 'black'
  }

  // kitty.greet(); //  Hi, I"m a cat -> context kitty
  kitty.greet.call(puppy); //  Hi, I"m a dog  -> context puppy



  //////// apply

  function sayWhere(city, country) {
    console.log(`I'm  ${this.name} from ${this.city} , ${this.country}  `)

  }
  const user2 = {
    name: 'Lola',
    city: 'New York',
    country: 'Usa'
  }

  // sayWhere.apply(user2, ['Paris', 'France']);
  // 'I'm Lola from Paris, France'
  // this.name context user2  -   city, country params of sayWhere

  // I'm  Lola from New York , Usa
  // this.name/city/country  context user2



//// Object.create



  const cat = {
    makeSound: function () {
      elog('make Sound', this.sound)
    },
    talk: 'system',
    getTalk: function () {
      elog('get Talk', this.talk)
    }
  }

  //const mark = Object.create(cat)
  // mark.sound = 'elpro'
  // mark.makeSound()// ->  'elpro'






////////////////////////////////

const obj = {
  name: 'elpro',
  ingredients: [
    {
      name: "Bread",
      order: 1,
      required: 1,
      items: [
        {
          ingredientsId: 1,
          itemsId: 1,
          name: "Integral",
          quantity: 1,
          price: 2.5,
          limit: 1,
          disabled: true
        }
      ]
    }
  ],
  fn: function (itemName, callBack) {
    const ingredients = this.ingredients

    const ingredientsNames = ingredients.map(item => ({
      name: item.name,
      quantity: item.quantity,
    }))
    const index = ingredients.findIndex(item => item.name === itemName)
    const ItemsName = ingredients[index].items.map(item => item.name)

    return callBack
      ? callBack(
        index,
        ItemsName,
        ingredientsNames)
      : typeof itemName === 'function'
        ? itemName(
          index,
          ItemsName,
          ingredientsNames
        )
        : ({
          index,
          ItemsName,
          ingredientsNames
        })
  }
}

  const func = (a, b, c) => a + 100
  const cal = obj.fn('Bread', func)

//////////////////////////////////////////////////////

const Renderer = (Wrapped) => (props) => {
  log('Renderer', { Wrapped, props })
  return <Wrapped {...props} />
}

const Child = (props) => {
  const h = `${props.name} ${props.lastName}`
  return (
    <h1>Hello {h}</h1>
  );
}
const App = (props) => {
  const lastName = 'system'
  const C = Renderer(props.comp)
  return (
    <C name={props.name} lastName={lastName} />
  )
}
<App name='elpro' comp={Child} />


//////////////////////////////////////////////////////

const EnhanceComponent = ({ Component, ...props }) => {
  return (
    <>
      {{
        ...Component, props: {
          ...Component.props, ...props
        }
      }}
    </>
  )
}

const props = {
  handleBack: handleBack,
  clearAllToCart: clearAllToCart,
  cartBurguer: cartBurguer,
  Component: <Cart/>
}
const EnhancedTitle = EnhanceComponent(props)
 {EnhancedTitle}

*/
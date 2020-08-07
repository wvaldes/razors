import { writable, derived } from 'svelte/store'

// import localCart from '../localCart'
// local cart approach
// const cart = writable([...localCart])

// local storage approach
const cart = writable(getStorageCart())

// cart total
export const cartTotal = derived(cart, ($cart) => {
  let total = $cart.reduce((accumulator, current) => {
    return (accumulator += current.amount * current.price)
  }, 0)
  return total.toFixed(2)
})

//local functions
const remove = (id, items) => {
  return items.filter((item) => item.id != id)
}

const toggleAmount = (id, items, action) => {
  return items.map((item) => {
    let newAmount
    if (action === 'inc') {
      newAmount = item.amount + 1
    } else if (action === 'dec') {
      newAmount = item.amount - 1
    } else {
      newAmount = item.amount
    }
    return item.id === id ? { ...item, amount: newAmount } : { ...item }
  })
}
// global functions
export const removeItem = (id) => {
  cart.update((storeValue) => {
    return remove(id, storeValue)
    // return storeValue.filter((item) => item.id !== id)
  })
}

export const increaseAmount = (id) => {
  cart.update((storeValue) => {
    return toggleAmount(id, storeValue, 'inc')
  })
}

export const decreaseAmount = (id) => {
  cart.update((storeValue) => {
    let item = storeValue.find((item) => item.id === id)
    let cart
    if (item.amount === 1) {
      cart = remove(id, storeValue)
    } else {
      cart = toggleAmount(id, storeValue, 'dec')
    }
    return [...cart]
  })
}

export const addToCart = (product) => {
  cart.update((storeValue) => {
    const { id, image, title, price } = product
    let item = storeValue.find((item) => item.id === id)
    let cart
    if (item) {
      cart = toggleAmount(id, storeValue, 'inc')
    } else {
      let newItem = { id, image, title, price, amount: 1 }
      cart = [...storeValue, newItem]
    }
    return cart
  })
  console.log(product)
}

// localStorage
function getStorageCart() {
  // return items in cart that are stored in local storage or an empty array
  return localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : []
}

export function setStorageCart(cartValues) {
  localStorage.setItem('cart', JSON.stringify(cartValues))
}
export default cart

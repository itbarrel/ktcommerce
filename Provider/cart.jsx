import React, { createContext, useState } from 'react'
export const CartContext = createContext(null)

export const CartProvider = (props) => {
  const [addToCart, setaddToCart] = useState([])

  return (
    <CartContext.Provider value={{ addToCart, setaddToCart }}>
      {props.children}
    </CartContext.Provider>
  )
}

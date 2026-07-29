import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    if (typeof window === 'undefined') return []

    try {
      return JSON.parse(localStorage.getItem('chocomart-cart') || '[]')
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('chocomart-cart', JSON.stringify(items))
  }, [items])

  const addToCart = (product) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id)

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }

      return [...currentItems, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (id, delta) => {
    setItems((currentItems) =>
      currentItems
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const removeFromCart = (id) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id))
  }

  const clearCart = () => setItems([])

  const getTotalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const getSubtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const getDiscount = items.reduce((sum, item) => sum + (item.price * item.quantity * (item.discount || 0)) / 100, 0)
  const getDeliveryCharge = getSubtotal - getDiscount > 60 ? 0 : 6
  const getGrandTotal = getSubtotal - getDiscount + getDeliveryCharge

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getTotalItems,
        getSubtotal,
        getDiscount,
        getDeliveryCharge,
        getGrandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }

  return context
}

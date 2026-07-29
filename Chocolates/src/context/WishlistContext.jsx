import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('chocomart-wishlist') || '[]')
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('chocomart-wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const addToWishlist = (product) => {
    setWishlist((current) => {
      if (current.some((item) => item.id === product.id)) return current
      return [...current, product]
    })
  }

  const removeFromWishlist = (productId) => {
    setWishlist((current) => current.filter((item) => item.id !== productId))
  }

  const isInWishlist = (productId) => wishlist.some((item) => item.id === productId)

  const value = useMemo(
    () => ({
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      wishlistCount: wishlist.length,
    }),
    [wishlist],
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  return useContext(WishlistContext)
}

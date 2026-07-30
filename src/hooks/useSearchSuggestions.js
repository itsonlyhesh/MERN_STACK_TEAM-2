import { useState, useEffect, useRef } from 'react'
import { products } from '../data/products'

export default function useSearchSuggestions(query) {
  const [suggestions, setSuggestions] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const debounceRef = useRef(null)

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    const trimmed = query.trim().toLowerCase()

    if (!trimmed) {
      setSuggestions([])
      setIsOpen(false)
      return
    }

    debounceRef.current = setTimeout(() => {
      const matches = products
        .filter(
          (product) =>
            product.name.toLowerCase().includes(trimmed) ||
            product.brand.toLowerCase().includes(trimmed) ||
            product.category.toLowerCase().includes(trimmed) ||
            product.tag.toLowerCase().includes(trimmed),
        )
        .slice(0, 6)

      setSuggestions(matches)
      setIsOpen(matches.length > 0)
    }, 300)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [query])

  const close = () => setIsOpen(false)

  return { suggestions, isOpen, close }
}

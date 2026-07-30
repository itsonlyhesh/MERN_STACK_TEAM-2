import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiHeart, FiStar, FiEye, FiShoppingCart, FiCheck } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import QuickViewModal from './QuickViewModal'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [showQuickView, setShowQuickView] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const originalPrice = product.price
  const discountedPrice = product.discount
    ? (originalPrice * (1 - product.discount / 100)).toFixed(2)
    : originalPrice.toFixed(2)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 1500)
  }

  const renderStars = (rating) => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FiStar
          key={i}
          size={13}
          className={i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}
        />,
      )
    }
    return stars
  }

  return (
    <>
      <article className="group overflow-hidden rounded-[28px] border border-stone-200 bg-white shadow-[0_20px_45px_-25px_rgba(60,28,10,0.35)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_60px_-20px_rgba(60,28,10,0.5)]">
        <Link to={`/product/${product.id}`}>
          <div className="relative overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Discount Badge */}
            {product.discount > 0 && (
              <span className="absolute left-3 top-3 rounded-full bg-emerald-500 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-lg">
                -{product.discount}%
              </span>
            )}

            {/* Tag */}
            <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7c3a12] shadow-sm backdrop-blur-sm">
              {product.tag}
            </span>

            {/* Quick View Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/30">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setShowQuickView(true)
                }}
                className="translate-y-4 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-stone-800 opacity-0 shadow-lg transition-all duration-300 hover:bg-[#7c3a12] hover:text-white group-hover:translate-y-0 group-hover:opacity-100"
              >
                <FiEye size={16} className="inline mr-1.5" />
                Quick View
              </button>
            </div>
          </div>
        </Link>

        <div className="space-y-2.5 p-5">
          {/* Brand */}
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-stone-400">{product.brand}</p>

          {/* Name */}
          <Link
            to={`/product/${product.id}`}
            className="block text-base font-semibold leading-snug text-stone-900 transition hover:text-[#7c3a12]"
          >
            {product.name}
          </Link>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-1.5">
            <div className="flex">{renderStars(product.rating)}</div>
            <span className="text-xs font-medium text-stone-600">{product.rating}</span>
            {product.reviewCount && (
              <span className="text-xs text-stone-400">({product.reviewCount.toLocaleString()})</span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xl font-bold text-stone-900">${discountedPrice}</span>
            {product.discount > 0 && (
              <span className="text-sm text-stone-400 line-through">${originalPrice.toFixed(2)}</span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleAddToCart}
              className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                addedToCart
                  ? 'bg-emerald-500 text-white scale-105'
                  : 'bg-[#7c3a12] text-white hover:bg-[#5b2910] active:scale-95'
              }`}
            >
              {addedToCart ? (
                <>
                  <FiCheck size={16} className="animate-in fade-in" />
                  Added
                </>
              ) : (
                <>
                  <FiShoppingCart size={16} />
                  Add to cart
                </>
              )}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                if (isInWishlist(product.id)) {
                  removeFromWishlist(product.id)
                } else {
                  addToWishlist(product)
                }
              }}
              className={`rounded-full border p-2.5 transition-all duration-300 ${
                isInWishlist(product.id)
                  ? 'border-[#7c3a12] bg-[#fff7eb] text-[#7c3a12]'
                  : 'border-stone-200 text-stone-600 hover:border-[#7c3a12] hover:text-[#7c3a12] active:scale-90'
              }`}
              aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <FiHeart
                size={16}
                className={isInWishlist(product.id) ? 'fill-[#7c3a12]' : ''}
              />
            </button>
          </div>
        </div>
      </article>

      {showQuickView && (
        <QuickViewModal product={product} onClose={() => setShowQuickView(false)} />
      )}
    </>
  )
}

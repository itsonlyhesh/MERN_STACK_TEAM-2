import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FiArrowLeft, FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [selectedImage, setSelectedImage] = useState(null)

  const product = useMemo(() => products.find((item) => item.id === Number(id)), [id])

  const relatedProducts = useMemo(() => {
    if (!product) return []
    return products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 2)
  }, [product])

  const similarProducts = useMemo(() => {
    if (!product) return []
    return products.filter((item) => item.id !== product.id && item.rating >= 4.7).slice(0, 2)
  }, [product])

  if (!product) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-stone-200 bg-white p-10 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7c3a12]">Product unavailable</p>
          <h1 className="mt-3 text-3xl font-semibold text-stone-900">This chocolate is not available right now.</h1>
          <button onClick={() => navigate('/shop')} className="mt-6 rounded-full bg-[#7c3a12] px-6 py-3 font-semibold text-white">
            Back to shop
          </button>
        </div>
      </main>
    )
  }

  const gallery = product.images ?? [product.image]
  const displayedImage = selectedImage ?? gallery[0]

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <button onClick={() => navigate('/shop')} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#7c3a12]">
        <FiArrowLeft /> Back to shop
      </button>

      <section className="grid gap-8 rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm lg:grid-cols-[0.95fr_1.05fr] lg:p-8">
        <div>
          <div className="overflow-hidden rounded-[24px] border border-stone-200 bg-[#fffaf3] p-3">
            <img src={displayedImage} alt={product.name} className="h-[420px] w-full rounded-[18px] object-cover" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {gallery.map((image, index) => (
              <button key={`${image}-${index}`} onClick={() => setSelectedImage(image)} className={`overflow-hidden rounded-2xl border ${displayedImage === image ? 'border-[#7c3a12]' : 'border-stone-200'}`}>
                <img src={image} alt={`${product.name} ${index + 1}`} className="h-24 w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#fff7eb] px-3 py-1 text-sm font-semibold uppercase tracking-[0.25em] text-[#7c3a12]">{product.tag}</span>
              <span className="text-sm font-semibold text-stone-500">{product.brand}</span>
            </div>
            <h1 className="mt-4 text-3xl font-semibold text-stone-900">{product.name}</h1>
            <div className="mt-3 flex items-center gap-2 text-amber-500">
              {Array.from({ length: 5 }).map((_, index) => (
                <FiStar key={index} />
              ))}
              <span className="ml-1 text-sm font-semibold text-stone-600">{product.rating} / 5</span>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <p className="text-3xl font-semibold text-stone-900">${product.price}</p>
              <span className="rounded-full bg-[#e9f7ee] px-3 py-1 text-sm font-semibold text-[#16784c]">{product.discount}% off</span>
              <span className="text-sm font-semibold text-stone-600">{product.stockStatus}</span>
            </div>

            <p className="mt-6 text-lg leading-8 text-stone-600">{product.description}</p>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-[24px] border border-stone-200 bg-[#fffaf3] p-5">
                <h2 className="text-lg font-semibold text-stone-900">Ingredients</h2>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-stone-600">
                  {product.ingredients.map((ingredient) => (
                    <li key={ingredient}>• {ingredient}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[24px] border border-stone-200 bg-[#fffaf3] p-5">
                <h2 className="text-lg font-semibold text-stone-900">Nutrition</h2>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-stone-600">
                  {product.nutrition.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => addToCart(product)} className="inline-flex items-center gap-2 rounded-full bg-[#7c3a12] px-6 py-3 font-semibold text-white transition hover:bg-[#5b2910]">
              <FiShoppingCart /> Add to cart
            </button>
            <button
              onClick={() => (isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product))}
              className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-6 py-3 font-semibold text-stone-800 transition hover:border-[#7c3a12] hover:text-[#7c3a12]"
            >
              <FiHeart className={isInWishlist(product.id) ? 'text-[#7c3a12]' : ''} />
              {isInWishlist(product.id) ? 'Saved to wishlist' : 'Add to wishlist'}
            </button>
            <button onClick={() => { addToCart(product); navigate('/cart') }} className="rounded-full border border-stone-300 px-6 py-3 font-semibold text-stone-800 transition hover:border-[#7c3a12] hover:text-[#7c3a12]">
              Buy now
            </button>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7c3a12]">Related products</p>
          <h2 className="mt-2 text-3xl font-semibold text-stone-900">Perfect companions</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {relatedProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7c3a12]">Similar chocolates</p>
          <h2 className="mt-2 text-3xl font-semibold text-stone-900">You may also love</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {similarProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </main>
  )
}

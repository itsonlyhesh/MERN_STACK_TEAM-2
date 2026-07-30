import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

const itemsPerPage = 4

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('search') ?? ''
  const [category, setCategory] = useState('All')
  const [maxPrice, setMaxPrice] = useState(40)
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState('popular')
  const [currentPage, setCurrentPage] = useState(1)

  const categories = useMemo(() => ['All', ...new Set(products.map((product) => product.category))], [])

  useEffect(() => {
    setCurrentPage(1)
  }, [query, category, maxPrice, minRating, sortBy])

  const filteredProducts = useMemo(() => {
    const search = query.trim().toLowerCase()

    const result = products.filter((product) => {
      const matchesSearch =
        !search ||
        [product.name, product.brand, product.category].some((value) =>
          value.toLowerCase().includes(search),
        )

      const matchesCategory = category === 'All' || product.category === category
      const matchesPrice = product.price <= maxPrice
      const matchesRating = product.rating >= minRating

      return matchesSearch && matchesCategory && matchesPrice && matchesRating
    })

    switch (sortBy) {
      case 'price-asc':
        return [...result].sort((a, b) => a.price - b.price)
      case 'price-desc':
        return [...result].sort((a, b) => b.price - a.price)
      case 'new':
        return [...result].sort((a, b) => Number(b.isNew) - Number(a.isNew))
      default:
        return [...result].sort((a, b) => b.popularity - a.popularity)
    }
  }, [category, maxPrice, minRating, query, sortBy])

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage))
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7c3a12]">Luxury collection</p>
          <h1 className="mt-2 text-3xl font-semibold text-stone-900">Shop our signature chocolates</h1>
        </div>
        <p className="max-w-xl text-sm leading-7 text-stone-600">
          Every box is crafted with premium couverture and presented with elegant finishing touches.
        </p>
      </div>

      <div className="mb-8 grid gap-4 rounded-[28px] border border-stone-200 bg-white p-4 shadow-sm lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_0.8fr] lg:p-6">
        <label className="flex items-center gap-3 rounded-full border border-stone-200 bg-[#fffaf3] px-4 py-3">
          <FiSearch className="text-stone-500" />
          <input
            value={query}
            onChange={(event) => {
              const nextParams = new URLSearchParams(searchParams)
              if (event.target.value.trim()) {
                nextParams.set('search', event.target.value)
              } else {
                nextParams.delete('search')
              }
              setSearchParams(nextParams)
            }}
            placeholder="Search chocolates"
            className="w-full bg-transparent text-sm outline-none"
          />
        </label>

        <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-full border border-stone-200 bg-white px-4 py-3 text-sm outline-none">
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <label className="rounded-full border border-stone-200 px-4 py-3 text-sm">
          <span className="mb-2 block text-stone-500">Max price</span>
          <input type="range" min="10" max="40" step="2" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} className="w-full" />
          <span className="mt-1 block font-semibold text-stone-900">${maxPrice}</span>
        </label>

        <select value={minRating} onChange={(event) => setMinRating(Number(event.target.value))} className="rounded-full border border-stone-200 bg-white px-4 py-3 text-sm outline-none">
          <option value={0}>All ratings</option>
          <option value={4}>4+ stars</option>
          <option value={4.5}>4.5+ stars</option>
          <option value={4.8}>4.8+ stars</option>
        </select>

        <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="rounded-full border border-stone-200 bg-white px-4 py-3 text-sm outline-none">
          <option value="popular">Popularity</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="new">New Arrivals</option>
        </select>
      </div>

      <div className="mb-6 flex items-center justify-between text-sm text-stone-600">
        <p>
          Showing <span className="font-semibold text-stone-900">{filteredProducts.length}</span> products
        </p>
        <p>Page {currentPage} of {totalPages}</p>
      </div>

      {paginatedProducts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-[28px] border border-dashed border-stone-300 bg-white p-10 text-center text-stone-600">
          No chocolates match your filters yet. Try broadening your search.
        </div>
      )}

      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
          disabled={currentPage === 1}
          className="rounded-full border border-stone-200 p-2 text-stone-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <FiChevronLeft size={18} />
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`h-10 w-10 rounded-full text-sm font-semibold ${currentPage === page ? 'bg-[#7c3a12] text-white' : 'border border-stone-200 text-stone-700'}`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
          disabled={currentPage === totalPages}
          className="rounded-full border border-stone-200 p-2 text-stone-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <FiChevronRight size={18} />
        </button>
      </div>
    </main>
  )
}

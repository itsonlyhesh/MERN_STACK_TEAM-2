import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const slides = [
  {
    id: 1,
    bg: 'from-[#4a1f0a] to-[#7c3a12]',
    badge: 'Limited Edition',
    title: 'Velvet Chocolate Collection',
    subtitle: 'Indulge in handcrafted luxury — gift-ready boxes starting at $19.99',
    cta: 'Shop the collection',
    link: '/shop?search=velvet',
    image: 'https://th.bing.com/th/id/OIP.-WRDcy5SZuweXaRg5lMnNAHaE7?w=272&h=186&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
  },
  {
    id: 2,
    bg: 'from-[#1a3a2a] to-[#2d6b4a]',
    badge: 'Up to 20% Off',
    title: 'Premium Imported Chocolates',
    subtitle: 'Swiss, Belgian & German classics — authentic taste, delivered free.',
    cta: 'Explore imports',
    link: '/shop?category=Imported+Chocolates',
    image: 'https://th.bing.com/th/id/OIP.jimkk32zbeb6X3u9dwHrYwHaHa?w=179&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
  },
  {
    id: 3,
    bg: 'from-[#3a1a1a] to-[#6b2d2d]',
    badge: 'Sugar Free',
    title: 'Guilt-Free Indulgence',
    subtitle: 'Rich, sugar-free dark chocolate bars for the health-conscious connoisseur.',
    cta: 'Shop sugar free',
    link: '/shop?category=Sugar+Free',
    image: 'https://th.bing.com/th/id/OIP.JSwIEDKk_uRQ6lMMPfBtmgHaJl?w=138&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
  },
  {
    id: 4,
    bg: 'from-[#2a1a3a] to-[#4a2d6b]',
    badge: 'Gift Boxes',
    title: 'Elegant Gifting, Effortless Joy',
    subtitle: 'Curated chocolate gift boxes — perfect for birthdays, anniversaries & corporate gifting.',
    cta: 'Browse gift boxes',
    link: '/shop?category=Gift+Boxes',
    image: 'https://www.bing.com/th?id=OPAC.r1uxSGyEz11J1g474C474&o=5&pid=21.1&w=180&h=180&rs=1&qlt=100&dpr=1.3&o=2',
  },
]

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index)
  }, [])

  const goNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const goPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(goNext, 5000)
    return () => clearInterval(interval)
  }, [goNext])

  const slide = slides[currentSlide]

  return (
    <section className="relative w-full overflow-hidden">
      <div
        className={`relative flex min-h-[420px] w-full items-center bg-gradient-to-br ${slide.bg} transition-all duration-700 md:min-h-[500px]`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.08),transparent_60%)]" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:px-8 lg:py-16">
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-white/90 backdrop-blur-sm">
              {slide.badge}
            </span>
            <h1 className="mt-6 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {slide.title}
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">
              {slide.subtitle}
            </p>
            <Link
              to={slide.link}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-stone-900 shadow-lg transition hover:bg-white/90 hover:shadow-xl"
            >
              {slide.cta}
              <FiChevronRight size={18} />
            </Link>
          </div>

          <div className="flex-1">
            <div className="mx-auto max-w-md overflow-hidden rounded-[28px] border border-white/20 shadow-2xl lg:mx-0 lg:ml-auto">
              <img
                src={slide.image}
                alt={slide.title}
                className="h-64 w-full object-cover transition-transform duration-700 hover:scale-105 md:h-72"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goPrev}
        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2.5 text-white backdrop-blur-sm transition hover:bg-white/40"
        aria-label="Previous slide"
      >
        <FiChevronLeft size={22} />
      </button>
      <button
        onClick={goNext}
        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2.5 text-white backdrop-blur-sm transition hover:bg-white/40"
        aria-label="Next slide"
      >
        <FiChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2.5 rounded-full transition-all ${
              index === currentSlide
                ? 'w-8 bg-white'
                : 'w-2.5 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

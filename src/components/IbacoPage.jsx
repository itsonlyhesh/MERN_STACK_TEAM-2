import React, { useState } from 'react'
import { MapPin, Clock, Instagram, IceCream, Star } from 'lucide-react'
import { FLAVORS } from '../data/flavors'
import FlavorCard from './FlavorCard'
import DripDivider from './DripDivider'
import qrImage from '../assets/images/IMG_20260731_100801.jpg.jpeg'

export default function IbacoPage() {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (flavor) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.name === flavor.name)
      if (existing) {
        return current.map((item) =>
          item.name === flavor.name ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...current, { ...flavor, quantity: 1 }]
    })
  }

  const removeFromCart = (flavorName) => {
    setCartItems((current) =>
      current
        .map((item) =>
          item.name === flavorName ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const [paymentMethod, setPaymentMethod] = useState('Card')

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cartItems.reduce((sum, item) => {
    const price = Number(item.price.replace(/[^0-9]/g, ''))
    return sum + price * item.quantity
  }, 0)

  const upiQrUrl = cartTotal > 0
    ? `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(
        `upi://pay?pa=pb@upi&pn=Ibaco&am=${cartTotal}&cu=INR`
      )}`
    : ''

  return (
    <div style={{ background: '#1A0E08', minHeight: '100vh' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&display=swap');`}</style>

      <header className="sticky top-0 z-20 backdrop-blur-sm" style={{ background: '#1A0E08cc', borderBottom: '1px solid #2E1A10' }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IceCream size={22} color="#D4A83D" />
            <span style={{ fontFamily: "'Fraunces', serif", color: '#F7EEDD', fontSize: 20, letterSpacing: 1 }}>
              IBACO
            </span>
          </div>
          <nav className="hidden sm:flex gap-8 text-sm" style={{ fontFamily: "'Work Sans', sans-serif", color: '#C9B7A2' }}>
            <a href="#flavors" className="hover:text-[#D4A83D] transition-colors">Flavors</a>
            <a href="#story" className="hover:text-[#D4A83D] transition-colors">Our Story</a>
            <a href="#visit" className="hover:text-[#D4A83D] transition-colors">Visit Us</a>
          </nav>
        </div>
      </header>

      <section className="relative px-6 pt-16 pb-10 text-center overflow-hidden">
        <h1 className="text-5xl sm:text-6xl leading-tight mb-5" style={{ fontFamily: "'Fraunces', serif", color: '#F7EEDD' }}>
          I Believe Ambrosia<br />Comes Only <span style={{ color: '#D4A83D' }}>from Ibaco</span>
        </h1>
        <p className="max-w-md mx-auto text-base mb-8" style={{ color: '#C9B7A2', fontFamily: "'Work Sans', sans-serif" }}>
          Small-batch ice cream, churned slow and served generous. Eight signature
          scoops, made fresh every morning.
        </p>
        <a href="#flavors" className="inline-block px-7 py-3 rounded-full text-sm transition-transform hover:scale-105" style={{ background: '#D4A83D', color: '#1A0E08', fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
          Explore the flavors
        </a>
      </section>

      <DripDivider />

      <section id="story" className="px-6 py-14" style={{ background: '#1A0E08' }}>
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-8 text-center">
          {[
            { label: 'Flavors on rotation', value: '8' },
            { label: 'Hours churned daily', value: '5am' },
            { label: 'Scoop, no shortcuts', value: '100%' },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: "'Fraunces', serif", color: '#D4A83D', fontSize: 34 }}>{s.value}</div>
              <div className="text-sm mt-1" style={{ color: '#8A7361', fontFamily: "'Work Sans', sans-serif" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="flavors" className="px-6 py-10" style={{ background: '#150B06' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl mb-8 text-center" style={{ fontFamily: "'Fraunces', serif", color: '#F7EEDD' }}>
            This week's scoops
          </h2>
          <div className="flavor-grid">
            {FLAVORS.map((f) => (
              <FlavorCard key={f.name} flavor={f} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-10" style={{ background: '#1A0E08' }}>
        <div className="max-w-6xl mx-auto cart-section">
          <div className="cart-header">
            <div>
              <div style={{ color: '#F7EEDD', fontFamily: "'Fraunces', serif", fontSize: 24 }}>
                Your cart
              </div>
              <div style={{ color: '#8A7361', fontFamily: "'Work Sans', sans-serif" }}>
                {cartCount} item{cartCount === 1 ? '' : 's'} added
              </div>
            </div>
            <div style={{ color: '#D4A83D', fontFamily: "'Fraunces', serif", fontSize: 20 }}>
              ₹{cartTotal.toLocaleString('en-IN')}
            </div>
          </div>

          {cartItems.length === 0 ? (
            <div className="cart-empty" style={{ color: '#C9B7A2', fontFamily: "'Work Sans', sans-serif" }}>
              Your cart is empty. Add a flavor to begin!
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.name} className="cart-item">
                    <div>
                      <div style={{ color: '#F7EEDD', fontFamily: "'Fraunces', serif", fontWeight: 700 }}>
                        {item.name}
                      </div>
                      <div style={{ color: '#C9B7A2', fontFamily: "'Work Sans', sans-serif" }}>
                        Qty: {item.quantity}
                      </div>
                    </div>
                    <div className="cart-item-actions">
                      <span style={{ color: '#D4A83D', fontFamily: "'Fraunces', serif" }}>
                        ₹{(Number(item.price.replace(/[^0-9]/g, '')) * item.quantity).toLocaleString('en-IN')}
                      </span>
                      <button type="button" className="cart-remove-button" onClick={() => removeFromCart(item.name)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="payment-section">
                <div className="payment-card">
                  <div className="payment-header">Checkout</div>
                  <div className="payment-summary">
                    Total to pay
                    <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="payment-methods">
                    {['UPI', 'Card'].map((method) => (
                      <button
                        key={method}
                        type="button"
                        className={`payment-method-button ${paymentMethod === method ? 'active' : ''}`}
                        onClick={() => setPaymentMethod(method)}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                  {paymentMethod === 'UPI' && (
                    <div className="payment-qr">
                      <div className="payment-qr-title">Use any UPI app to complete the payment.</div>
                      <div className="payment-qr-amount">Amount: ₹{cartTotal.toLocaleString('en-IN')}</div>
                      <div className="payment-qr-image-wrapper">
                        <img src={qrImage} alt="UPI QR" className="payment-qr-img" />
                      </div>
                      <div className="payment-qr-label">pb@upi</div>
                    </div>
                  )}
                  <button type="button" className="checkout-button">
                    Pay ₹{cartTotal.toLocaleString('en-IN')} now
                  </button>
                  <p className="payment-note">
                    Complete your order with the preferred payment method once your scoops are in the cart.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <DripDivider flip />

      <footer id="visit" className="px-6 py-14" style={{ background: '#1A0E08' }}>
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={16} color="#D4A83D" />
              <span style={{ fontFamily: "'Fraunces', serif", color: '#F7EEDD' }}>Find us</span>
            </div>
            <p className="text-sm" style={{ color: '#8A7361', fontFamily: "'Work Sans', sans-serif" }}>
              Near the central atrium
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Clock size={16} color="#D4A83D" />
              <span style={{ fontFamily: "'Fraunces', serif", color: '#F7EEDD' }}>Hours</span>
            </div>
            <p className="text-sm" style={{ color: '#8A7361', fontFamily: "'Work Sans', sans-serif" }}>
              11:00 AM – 10:30 PM, all days
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Instagram size={16} color="#D4A83D" />
              <span style={{ fontFamily: "'Fraunces', serif", color: '#F7EEDD' }}>Follow along</span>
            </div>
            <p className="text-sm" style={{ color: '#8A7361', fontFamily: "'Work Sans', sans-serif" }}>
              @ibaco.scoops
            </p>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-10 pt-6 flex items-center justify-center gap-1 text-xs" style={{ borderTop: '1px solid #2E1A10', color: '#5E4A3A' }}>
          <Star size={12} color="#D4A83D" fill="#D4A83D" />
          Ibaco · part of the mall directory
        </div>
      </footer>
    </div>
  )
}

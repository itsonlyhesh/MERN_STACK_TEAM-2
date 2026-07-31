import React, { useState } from 'react'

export default function FlavorCard({ flavor, onAddToCart }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flavor-card transition-transform duration-300"
      style={{ transform: hover ? 'translateY(-8px)' : 'translateY(0)' }}
    >
      <div
        className="flavor-card-image-wrapper"
        style={{ background: `linear-gradient(160deg, ${flavor.from}, ${flavor.to})` }}
      >
        <img src={flavor.image} alt={flavor.name} className="flavor-card-image" />
      </div>

      <div className="flavor-card-body">
        <h3 className="flavor-card-title">{flavor.name}</h3>
        <p className="flavor-card-note">{flavor.note}</p>

        <div className="flavor-card-footer">
          <span>{flavor.price}</span>
          <span className="flavor-card-footer-text">per scoop</span>
        </div>
        <button type="button" className="flavor-card-button" onClick={() => onAddToCart(flavor)}>
          Add to cart
        </button>
      </div>
    </div>
  )
}

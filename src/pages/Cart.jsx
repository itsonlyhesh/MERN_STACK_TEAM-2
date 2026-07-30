import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../css/cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    shippingFee,
    tax,
    grandTotal
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem', background: '#FFF', borderRadius: '16px' }}>
        <span style={{ fontSize: '4rem' }}>🛒</span>
        <h2 style={{ marginTop: '1rem' }}>Your shopping cart is empty</h2>
        <p style={{ color: '#64748B', marginTop: '0.5rem' }}>Looks like you haven't added any books to your cart yet.</p>
        <Link to="/categories" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
          Browse Books Store 📚
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="section-header" style={{ textAlign: 'left' }}>
        <h1 className="section-title">Shopping Cart</h1>
        <p className="section-subtitle">Review your items before proceeding to checkout</p>
      </div>

      <div className="cart-page-layout">
        {/* Items Table */}
        <div className="cart-table-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>Items ({cartItems.length})</h3>
            <button className="btn btn-outline btn-sm" onClick={clearCart} style={{ color: '#EF4444', borderColor: '#EF4444' }}>
              Clear Cart
            </button>
          </div>

          <table className="cart-table">
            <thead>
              <tr>
                <th>Book</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                const book = item.book;
                const bookId = book._id || book.title;

                return (
                  <tr key={bookId}>
                    <td>
                      <div className="cart-item-flex">
                        <img
                          src={book.coverImage || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&auto=format&fit=crop'}
                          alt={book.title}
                          className="cart-thumb"
                        />
                        <div>
                          <Link to={`/book/${bookId}`} style={{ fontWeight: 700, color: '#0F172A' }}>
                            {book.title}
                          </Link>
                          <div style={{ fontSize: '0.8rem', color: '#64748B' }}>{book.author}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontWeight: 600 }}>${Number(item.price).toFixed(2)}</td>
                    <td>
                      <div className="qty-control">
                        <button className="qty-btn" onClick={() => updateQuantity(bookId, item.quantity - 1)}>-</button>
                        <span className="qty-input">{item.quantity}</span>
                        <button className="qty-btn" onClick={() => updateQuantity(bookId, item.quantity + 1)}>+</button>
                      </div>
                    </td>
                    <td style={{ fontWeight: 700, color: '#4F46E5' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td>
                      <button
                        onClick={() => removeFromCart(bookId)}
                        style={{ background: 'none', border: 'none', color: '#EF4444', fontSize: '1.1rem' }}
                        title="Remove item"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Summary Side Card */}
        <div className="summary-box">
          <h3 style={{ marginBottom: '1.25rem' }}>Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shippingFee === 0 ? <strong style={{ color: '#10B981' }}>FREE</strong> : `$${shippingFee.toFixed(2)}`}</span>
          </div>
          <div className="summary-row">
            <span>Estimated Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="summary-row total">
            <span>Grand Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>

          <button
            className="btn btn-primary btn-lg"
            style={{ width: '100%', marginTop: '1.5rem' }}
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout 💳
          </button>

          <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748B', marginTop: '1rem' }}>
            🔒 Safe & Secure 256-Bit SSL Checkout
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;

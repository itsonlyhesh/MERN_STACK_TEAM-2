import { useLocation, Link } from 'react-router-dom';

const OrderSuccess = () => {
  const location = useLocation();
  const order = location.state?.order || { _id: `BH-${Date.now()}`, totalPrice: 0 };

  return (
    <div className="order-success-page">
      <div className="order-success-card animate-fade-in">
        <div className="success-icon">🎉</div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Thank You for Your Order!</h1>
        <p style={{ color: '#64748B', fontSize: '1.05rem', marginBottom: '1.5rem' }}>
          Your purchase has been confirmed. A confirmation receipt has been sent to your email.
        </p>

        <div style={{ background: '#F8FAFC', padding: '1.25rem', borderRadius: '10px', margin: '1.5rem 0', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: '#64748B' }}>Order Number:</span>
            <strong>#{order._id || order.id}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: '#64748B' }}>Total Amount Paid:</span>
            <strong style={{ color: '#4F46E5' }}>${Number(order.totalPrice || 0).toFixed(2)}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#64748B' }}>Estimated Delivery:</span>
            <strong>3 - 5 Business Days 📦</strong>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
          <Link to="/" className="btn btn-primary">
            Back to Home 🏠
          </Link>
          <Link to="/categories" className="btn btn-outline">
            Continue Shopping 📚
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;

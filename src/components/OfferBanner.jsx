import { Link } from 'react-router-dom';

const OfferBanner = () => {
  return (
    <div className="offer-banner animate-fade-in">
      <div className="offer-content">
        <h3>⚡ Deal of the Day — Extra 25% Off</h3>
        <p>Use coupon code <strong>HAVEN25</strong> at checkout on all Programming & Academic titles.</p>
      </div>
      <Link to="/categories?offer=true" className="btn btn-primary btn-lg">
        Claim Discount 🎁
      </Link>
    </div>
  );
};

export default OfferBanner;

import "./TodayDeals.css";
import deals from "../../data/deals";
import { useNavigate } from "react-router-dom";
import OfferCountdown from "../OfferCountdown/OfferCountdown";
function TodayDeals() {
  const navigate = useNavigate();

  return (
    <section className="today-deals" id="deals">
  <div className="container">

    <div className="section-title">
      <h2>Today's Mall Offers</h2>
      <p>
        Exclusive brand offers available only at our mall store.
      </p>
    </div>

    {/* Countdown Timer */}
    <OfferCountdown />

    <div className="deals-grid">

      {deals.map((item) => (

        <div className="deal-card" key={item.id}>

          <span className="discount-badge">
            {item.discount}
          </span>

          <img
            src={item.image}
            alt={item.brand}
          />

          <h3>{item.brand}</h3>

          <div className="offer-details">
            <p className="offer-text">{item.offer}</p>
            <span className="offer-valid">
              {item.valid}
            </span>
          </div>

          <button onClick={() => navigate("/store")}>
            Claim Offer
          </button>

        </div>

      ))}

    </div>

  </div>
</section>
  );
}

export default TodayDeals;
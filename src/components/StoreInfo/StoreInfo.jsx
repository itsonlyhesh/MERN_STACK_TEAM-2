import "./StoreInfo.css";
import store from "../../assets/store/store.jpg";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function StoreInfo() {
      const navigate = useNavigate();
  return (
    <section className="store-section" id="store">

      <div className="container store-container">

        <div className="store-image">

          <img
            src={store}
            alt="BagVerse Store"
          />

        </div>

        <div className="store-content">

          <span className="store-tag">
            Visit Our Store
          </span>

          <h2>Experience BagVerse Inside The Mall</h2>

          <p>
            Explore our latest collection of backpacks,
            handbags, wallets, travel bags and premium
            accessories. Visit our store and discover
            exclusive offers available only at the mall.
          </p>

          <div className="store-details">

            <div className="detail">

              <FaMapMarkerAlt />

              <span>
                2nd Floor, City Mall, Hyderabad
              </span>

            </div>

            <div className="detail">

              <FaClock />

              <span>
                Open Daily : 10:00 AM - 10:00 PM
              </span>

            </div>

            <div className="detail">

              <FaPhoneAlt />

              <span>
                +91 98765 43210
              </span>

            </div>

          </div>

          <button
             onClick={() =>
            window.open(
            "https://www.google.com/maps",
            "_blank"
             )}
            >
            Get Directions
            </button>

        </div>

      </div>

    </section>
  );
}

export default StoreInfo;
import "./Hero.css";
import heroCollection from "../../assets/hero/hero-collection.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Hero() {
    const navigate = useNavigate();
  return (
    <section className="hero" id="home">

      <div className="container hero-container">

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >

          <span className="hero-tag">
            Premium Bag Store
          </span>

          <h1>
           Top Brands.
            Exclusive Offers.
            All Under One Roof.
          </h1>

          <p>
            Discover backpacks, handbags, travel bags,
            school bags and wallets from the world's
            leading brands.
          </p>

          <div className="hero-buttons">

            <button className="primary-btn"
                onClick={() => navigate("/brands")}>
                Shop Brands
                </button>

            <button className="secondary-btn"
                 onClick={() => navigate("/deals")}>
                 Today's Mall Offers
            </button>

            </div>

        </motion.div>

        <motion.div
          className="hero-image"
          animate={{ y: [0, -15, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >

          <img src={heroCollection} alt="BagVerse Hero" />

        </motion.div>

      </div>

    </section>
  );
}

export default Hero;
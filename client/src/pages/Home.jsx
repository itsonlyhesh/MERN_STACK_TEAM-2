import { Link } from "react-router-dom";
import "./Home.css";

const stores = [
  { name: "Movie Tickets", path: "/stores/movie", icon: "🎬" },
  { name: "Chocolate", path: "/stores/chocolate", icon: "🍫" },
  { name: "Fast Food", path: "/stores/food", icon: "🍔" },
  { name: "Bags", path: "/stores/bags", icon: "👜" },
  { name: "Dress", path: "/stores/dress", icon: "👗" },
  { name: "Shoes", path: "/stores/shoes", icon: "👟" },
  { name: "Ice Cream", path: "/stores/ice-cream", icon: "🍨" },
  { name: "Cosmetics", path: "/stores/cosmetics", icon: "💄" },
  { name: "Fragrances", path: "/stores/fragrances", icon: "🌸" },
  { name: "Books", path: "/stores/books", icon: "📚" },
  { name: "Sports", path: "/stores/sports", icon: "🏏" },
];

function Home() {
  return (
    <main>
      <section className="hero">
        <div>
          <p className="welcome-text">WELCOME TO</p>
          <h1>Nexa Mall</h1>

          <p className="hero-description">
            Explore shopping, entertainment, food and premium experiences
            under one roof.
          </p>

          <Link to="/stores" className="browse-button">
            Browse Stores
          </Link>
        </div>
      </section>

      <section className="stores-section">
        <div className="section-heading">
          <p>EXPLORE</p>
          <h2>Our Stores</h2>
          <span>Select a store category to continue.</span>
        </div>

        <div className="store-grid">
          {stores.map((store) => (
            <Link className="store-card" to={store.path} key={store.path}>
              <span>{store.icon}</span>
              <h3>{store.name}</h3>
              <p>Explore Store →</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
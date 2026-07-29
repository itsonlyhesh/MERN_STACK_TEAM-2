import "./Dress.css";

import heroImage from "./assets/banners/banner.png";

import mensImage from "./assets/categories/mens.jpg";
import womenImage from "./assets/categories/women.jpg";
import kidsImage from "./assets/categories/kids.jpg";
import ethnicImage from "./assets/categories/ethnic.jpg";
import casualImage from "./assets/categories/casual.jpg";
import formalImage from "./assets/categories/formal.jpg";
import partyImage from "./assets/categories/party.jpg";
import winterImage from "./assets/categories/winter.jpg";
import traditionalImage from "./assets/categories/traditional.jpg";

import casualShirt from "./assets/products/casual-shirt.jpg";
import formalShirt from "./assets/products/formal-shirt.jpg";
import tshirt from "./assets/products/tshirt.jpg";
import jeans from "./assets/products/jeans.jpg";
import kurti from "./assets/products/kurti.jpg";
import saree from "./assets/products/saree.jpg";
import lehenga from "./assets/products/lehenga.jpg";
import partyDress from "./assets/products/party-dress.jpg";
import topImage from "./assets/products/top.jpg";
import blazer from "./assets/products/blazer.jpg";
import hoodie from "./assets/products/hoodie.jpg";
import kidsDress from "./assets/products/kids-dress.jpg";

import weddingTrend from "./assets/trending/wedding.jpg";
import festiveTrend from "./assets/trending/festive.jpg";
import streetStyleTrend from "./assets/trending/streetstyle.jpg";
import luxuryTrend from "./assets/trending/luxury.jpg";

import sweatshirt from "./assets/newarrivals/sweatshirt.jpg";
import printedKurti from "./assets/newarrivals/printed-kurti.jpg";
import weddingSaree from "./assets/newarrivals/wedding-saree.jpg";
import denimJacket from "./assets/newarrivals/denim-jacket.jpg";
import cottonShirt from "./assets/newarrivals/cotton-shirt.jpg";
import anarkali from "./assets/newarrivals/anarkali.jpg";

const categories = [
  { id: 1, name: "Men's Wear", image: mensImage },
  { id: 2, name: "Women's Wear", image: womenImage },
  { id: 3, name: "Kids Wear", image: kidsImage },
  { id: 4, name: "Ethnic Wear", image: ethnicImage },
  { id: 5, name: "Casual Wear", image: casualImage },
  { id: 6, name: "Formal Wear", image: formalImage },
  { id: 7, name: "Party Wear", image: partyImage },
  { id: 8, name: "Winter Wear", image: winterImage },
  { id: 9, name: "Traditional Wear", image: traditionalImage },
];

const featuredProducts = [
  { id: 1, name: "Men's Casual Shirt", image: casualShirt, price: "₹999", rating: 4 },
  { id: 2, name: "Men's Formal Shirt", image: formalShirt, price: "₹1,499", rating: 5 },
  { id: 3, name: "Cotton T-Shirt", image: tshirt, price: "₹699", rating: 4 },
  { id: 4, name: "Denim Jeans", image: jeans, price: "₹1,899", rating: 5 },
  { id: 5, name: "Women's Kurti", image: kurti, price: "₹1,299", rating: 5 },
  { id: 6, name: "Cotton Saree", image: saree, price: "₹2,499", rating: 4 },
  { id: 7, name: "Designer Lehenga", image: lehenga, price: "₹6,999", rating: 5 },
  { id: 8, name: "Party Wear Dress", image: partyDress, price: "₹3,499", rating: 5 },
  { id: 9, name: "Women's Top", image: topImage, price: "₹899", rating: 4 },
  { id: 10, name: "Formal Blazer", image: blazer, price: "₹4,999", rating: 5 },
  { id: 11, name: "Winter Hoodie", image: hoodie, price: "₹2,299", rating: 4 },
  { id: 12, name: "Kids Party Dress", image: kidsDress, price: "₹1,799", rating: 5 },
];

const trendingProducts = [
  { id: 1, title: "Wedding Collection", image: weddingTrend },
  { id: 2, title: "Festive Fashion", image: festiveTrend },
  { id: 3, title: "Street Style", image: streetStyleTrend },
  { id: 4, title: "Luxury Collection", image: luxuryTrend },
];

const newArrivals = [
  { id: 1, name: "Casual Sweatshirt", image: sweatshirt, price: "₹2,199" },
  { id: 2, name: "Printed Kurti", image: printedKurti, price: "₹1,099" },
  { id: 3, name: "Wedding Saree", image: weddingSaree, price: "₹4,999" },
  { id: 4, name: "Denim Jacket", image: denimJacket, price: "₹3,299" },
  { id: 5, name: "Cotton Shirt", image: cottonShirt, price: "₹899" },
  { id: 6, name: "Anarkali Dress", image: anarkali, price: "₹3,999" },
];

function Dress() {
  return (
    <main className="dress-store">
      <section className="dress-hero" id="dress-home">
        <img src={heroImage} alt="Fashion collection" className="dress-hero-image" />
        <div className="dress-hero-overlay" />
        <div className="dress-hero-content">
          <p className="dress-subtitle">NEW ARRIVALS 2026</p>
          <h1>Discover Your<br />Perfect Outfit</h1>
          <p className="dress-description">
            Explore premium clothing collections for men, women, and kids with
            elegant fashion, affordable prices, and the latest trends.
          </p>
          <a className="dress-primary-action" href="#dress-featured">Shop Now</a>
        </div>
      </section>

      <section className="dress-categories" id="dress-categories">
        <h2 className="dress-section-title">Shop By Category</h2>
        <p className="dress-section-subtitle">Fashion collections for every occasion.</p>
        <div className="dress-category-grid">
          {categories.map((category) => (
            <article className="dress-category-card" key={category.id}>
              <div className="dress-category-image">
                <img src={category.image} alt={category.name} />
              </div>
              <div className="dress-category-info">
                <h3>{category.name}</h3>
                <a href="#dress-featured">Explore</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="dress-featured" id="dress-featured">
        <h2 className="dress-section-title">Featured Collection</h2>
        <p className="dress-section-subtitle">Best-selling outfits this season.</p>
        <div className="dress-product-grid">
          {featuredProducts.map((product) => (
            <article className="dress-product-card" key={product.id}>
              <div className="dress-product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="dress-product-content">
                <h3>{product.name}</h3>
                <div className="dress-rating" aria-label={`${product.rating} out of 5 stars`}>
                  {Array.from({ length: product.rating }, (_, index) => (
                    <span key={index} aria-hidden="true">★</span>
                  ))}
                </div>
                <p className="dress-price">{product.price}</p>
                <div className="dress-product-actions">
                  <button type="button" className="dress-cart-button">
                    <span aria-hidden="true">🛒</span> Add to Cart
                  </button>
                  <button type="button" className="dress-wishlist-button" aria-label={`Add ${product.name} to wishlist`}>
                    <span aria-hidden="true">♥</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="dress-trending">
        <h2 className="dress-section-title">Trending Collection</h2>
        <p className="dress-section-subtitle">Explore the latest fashion trends.</p>
        <div className="dress-trending-grid">
          {trendingProducts.map((item) => (
            <article className="dress-trend-card" key={item.id}>
              <div className="dress-trend-image"><img src={item.image} alt={item.title} /></div>
              <h3>{item.title}</h3>
              <a href="#dress-featured">Explore</a>
            </article>
          ))}
        </div>
      </section>

      <section className="dress-offers" aria-label="Fashion festival sale">
        <h2>Fashion Festival Sale</h2>
        <h3>UP TO 50% OFF</h3>
        <p>Starting from ₹499</p>
        <a href="#dress-featured">Shop Now</a>
      </section>

      <section className="dress-new-arrivals">
        <h2 className="dress-section-title">New Arrivals</h2>
        <p className="dress-section-subtitle">Fresh styles added for you.</p>
        <div className="dress-arrival-grid">
          {newArrivals.map((item) => (
            <article className="dress-arrival-card" key={item.id}>
              <div className="dress-arrival-image"><img src={item.image} alt={item.name} /></div>
              <h3>{item.name}</h3>
              <p>{item.price}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Dress;

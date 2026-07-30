import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import OfferBanner from '../components/OfferBanner';
import BookCard from '../components/BookCard';
import CategoryCard from '../components/CategoryCard';
import ReviewCard from '../components/ReviewCard';
import Loader from '../components/Loader';
import { fetchBooks, fetchCategories } from '../services/bookService';

const sampleReviews = [
  {
    name: 'Sarah Jenkins',
    role: 'Senior Software Engineer',
    rating: 5,
    comment: 'Book Haven is my absolute go-to for technical programming guides. Fast delivery and pristine print quality!'
  },
  {
    name: 'David Miller',
    role: 'Book Collector & Scholar',
    rating: 5,
    comment: 'Incredible selection of academic textbooks and rare history volumes. The customer support is top tier.'
  },
  {
    name: 'Emily Watson',
    role: 'Avid Reader',
    rating: 5,
    comment: 'The recommendations for fiction novels are always spot-on. I love the wishlist feature and discount deals!'
  }
];

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      setLoading(true);
      try {
        const [featured, best, cats] = await Promise.all([
          fetchBooks({ featured: 'true', limit: 4 }),
          fetchBooks({ bestseller: 'true', limit: 4 }),
          fetchCategories()
        ]);
        setFeaturedBooks(featured);
        setBestSellers(best);
        setCategories(cats);
      } catch (err) {
        console.error('Error loading home page data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Banner */}
      <Hero />

      {/* Today's Promotional Offer */}
      <OfferBanner />

      {/* Featured Books Section */}
      <section className="section-container" style={{ margin: '3.5rem 0' }}>
        <div className="section-header">
          <h2 className="section-title">Featured Titles</h2>
          <p className="section-subtitle">Handpicked masterworks selected by our expert editorial team</p>
        </div>
        {loading ? (
          <Loader text="Loading featured books..." />
        ) : (
          <div className="books-grid">
            {featuredBooks.map((book) => (
              <BookCard key={book._id || book.title} book={book} />
            ))}
          </div>
        )}
      </section>

      {/* Best Sellers Section */}
      <section className="section-container" style={{ margin: '3.5rem 0' }}>
        <div className="section-header">
          <h2 className="section-title">Best Sellers</h2>
          <p className="section-subtitle">Top-rated fan favorites loved by thousands of readers</p>
        </div>
        {loading ? (
          <Loader text="Loading best sellers..." />
        ) : (
          <div className="books-grid">
            {bestSellers.map((book) => (
              <BookCard key={book._id || book.title} book={book} />
            ))}
          </div>
        )}
      </section>

      {/* Popular Categories Grid */}
      <section className="section-container" style={{ margin: '3.5rem 0' }}>
        <div className="section-header">
          <h2 className="section-title">Explore Genres</h2>
          <p className="section-subtitle">Browse by topic to find your next great read</p>
        </div>
        <div className="categories-grid">
          {categories.slice(0, 8).map((category) => (
            <CategoryCard key={category._id || category.name} category={category} />
          ))}
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="section-container" style={{ margin: '3.5rem 0' }}>
        <div className="section-header">
          <h2 className="section-title">What Our Readers Say</h2>
          <p className="section-subtitle">Trusted by thousands of book lovers around the world</p>
        </div>
        <div className="reviews-grid">
          {sampleReviews.map((rev, index) => (
            <ReviewCard key={index} review={rev} />
          ))}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="newsletter-section">
        <h2>Join the Book Haven Club</h2>
        <p style={{ color: '#94A3B8', marginTop: '0.5rem' }}>
          Subscribe to receive exclusive discounts, new releases alerts, and weekly reading recommendations.
        </p>
        <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing!'); }}>
          <input type="email" placeholder="Enter your email address..." required />
          <button type="submit" className="btn btn-accent">Subscribe 📩</button>
        </form>
      </section>
    </div>
  );
};

export default Home;

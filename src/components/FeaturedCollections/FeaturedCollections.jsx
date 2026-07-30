import "./FeaturedCollections.css";
import collections from "../../data/collections";

function FeaturedCollections() {
  return (
    <section
      className="featured-collections"
      id="collections"
    >
      <div className="container">

        <div className="section-title">
          <h2>Featured Collections</h2>
          <p>
            Discover our specially curated collections for every lifestyle.
          </p>
        </div>

        <div className="collection-grid">

          {collections.map((item) => (

            <div
              className="collection-card"
              key={item.id}
            >
              <img
                src={item.image}
                alt={item.title}
              />

              <div className="collection-overlay">

                <h3>{item.title}</h3>

                <p>{item.subtitle}</p>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default FeaturedCollections;
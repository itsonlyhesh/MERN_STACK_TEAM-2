import "./Brands.css";
import brands from "../../data/brands";

function Brands() {
  return (
    <section className="brands" id="brands">

      <div className="container">

        <div className="section-title">
          <h2>Premium Brands</h2>
          <p>
            Discover top-quality brands available in our mall store.
          </p>
        </div>

        <div className="brands-grid">

          {brands.map((brand) => (

            <div
              className="brand-card"
              key={brand.id}
            >
              <img
                src={brand.logo}
                alt={brand.name}
              />

              <h3>{brand.name}</h3>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Brands;
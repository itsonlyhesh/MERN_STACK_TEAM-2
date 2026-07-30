import "./Categories.css";
import categories from "../../data/categories";

function Categories() {
  return (
    <section className="categories" id="categories">

      <div className="container">

        <div className="section-title">

          <h2>Explore Our Bag Categories</h2>

          <p>
            Find the perfect bag for every occasion.
          </p>

        </div>

        <div className="category-grid">

          {categories.map((item) => (

            <div className="category-card" key={item.id}>

              <div className="category-image">

                <img
                  src={item.image}
                  alt={item.title}
                />

              </div>

              <h3>{item.title}</h3>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Categories;
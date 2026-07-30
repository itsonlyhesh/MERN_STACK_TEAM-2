import "./Wishlist.css";
import { useState } from "react";

function Wishlist() {

  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );


  return (
    <section className="wishlist-page">

      <div className="container">

        <h2>Your Wishlist ❤️</h2>

        <div className="products-grid">

          {
            wishlist.length === 0 ? (

              <h3>No items added yet</h3>

            ) : (

              wishlist.map((product)=>(

                <div className="product-card" key={product.id}>

                  <img 
                    src={product.image}
                    alt={product.name}
                  />

                  <div className="product-info">

                    <h3>{product.name}</h3>

                    <h4>{product.price}</h4>

                  </div>

                </div>

              ))

            )
          }

        </div>

      </div>

    </section>
  );
}

export default Wishlist;
import "./TrendingProducts.css";
import products from "../../data/products";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function TrendingProducts() {

  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );


  const addToWishlist = (product) => {

    let updatedWishlist;

    const exists = wishlist.find(
      (item) => item.id === product.id
    );


    if (exists) {

      updatedWishlist = wishlist.filter(
        (item) => item.id !== product.id
      );

    } 
    else {

      updatedWishlist = [
        ...wishlist,
        product
      ];

    }


    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );
     window.dispatchEvent(
    new Event("wishlistUpdated")
  );


  };


  return (
    <section className="trending-products">

      <div className="container">

        <div className="section-title">
          <h2>Trending Products</h2>

          <p>
            Explore our most loved bags this season.
          </p>

        </div>


        <div className="products-grid">

          {
          products.map((product)=>(

            <div 
              className="product-card"
              key={product.id}
            >


              <button
                className="wishlist"
                onClick={()=>addToWishlist(product)}
              >

                <FaHeart
                className="heart-icon"
                style={{
               fill: wishlist.some(item => item.id === product.id)
                ? "red"
                : "white",
                stroke: wishlist.some(item => item.id === product.id)
                ? "red"
                : "#999",
                }}
                />

              </button>



              <img
                src={product.image}
                alt={product.name}
              />


              <div className="product-info">


                <h3>
                  {product.name}
                </h3>


                <span className="rating">
                  {product.rating}
                </span>


                <h4>
                  {product.price}
                </h4>


                <button
                  onClick={()=>
                    navigate(`/products/${product.id}`)
                  }
                >
                  View Details
                </button>


              </div>


            </div>

          ))
          }


        </div>

      </div>

    </section>
  );
}

export default TrendingProducts;
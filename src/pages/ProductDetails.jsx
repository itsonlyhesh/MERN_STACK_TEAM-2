import { useParams } from "react-router-dom";
import products from "../data/products";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="product-details container">
        <img src={product.image} alt={product.name} />

        <div className="details">
          <h1>{product.name}</h1>

          <h2>{product.price}</h2>

          <p>{product.description}</p>

          <p><strong>Category:</strong> {product.category}</p>

          <p><strong>Brand:</strong> {product.brand}</p>

          <p><strong>Rating:</strong> ⭐ {product.rating}</p>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductDetails;
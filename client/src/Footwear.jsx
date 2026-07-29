import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import noImage from "./assets/no-image.svg";
// preload all files from the assets folder so we can map local: markers dynamically
const localImages = import.meta.glob('./assets/*', { eager: true, as: 'url' });

function Footwear() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All");
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const resolveImage = (img) => {
    if (!img) return noImage;
    if (typeof img !== 'string') return noImage;

    // Case: marker local:Filename.ext
    if (img.startsWith('local:')) {
      const name = img.slice(6);
      const key = `./assets/${name}`;
      if (localImages[key]) return localImages[key];
      // try variants (spaces -> %20)
      const keyEnc = `./assets/${encodeURIComponent(name)}`;
      if (localImages[keyEnc]) return localImages[keyEnc];
      return noImage;
    }

    // Case: server stored a path like src\\assets\\Name.jpg or src/assets/Name.jpg
    const basenameMatch = img.match(/([^\\\\/]+\\.[a-zA-Z0-9]{2,6})$/);
    if (basenameMatch) {
      const name = basenameMatch[1];
      const key = `./assets/${name}`;
      if (localImages[key]) return localImages[key];
    }

    // Otherwise assume it's an external URL and return as-is
    return img;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const brands = useMemo(() => {
    return ["All", ...new Set(products.map((product) => product.brand))];
  }, [products]);

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      (brand === "All" || product.brand === brand)
    );
  });

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item._id === product._id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const toggleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((item) => item !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (

    <>
    
    <nav className="navbar">
  <div className="logo">
    👟 Shoe Square
  </div>

  <div className="cart-icon">
    🛒 Cart
    <span>{cart.length}</span>
  </div>

</nav>

<section className="hero">
  <h1>Find Your Perfect Pair</h1>
  <p>Quality footwear for every step.</p>
  <button
  className="shop-btn"
  onClick={() =>
    document.querySelector(".products").scrollIntoView({
      behavior: "smooth",
    })
  }
>
  Shop Now
</button>
</section>
{wishlist.length > 0 && (
  <p className="wishlist-count">
    ❤️ Wishlist Items : {wishlist.length}
  </p>
)}

<div className="container">

  <div className="controls">

    <input
      type="text"
      placeholder="Search footwear..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    <select
      value={brand}
      onChange={(e) => setBrand(e.target.value)}
    >
      {brands.map((brandName) => (
        <option key={brandName} value={brandName}>
          {brandName}
        </option>
      ))}
    </select>

  </div>

  <div className="products">

    {filteredProducts.length === 0 ? (

      <h2>No Products Found</h2>

    ) : (

      filteredProducts.map((product) => {

        const productId = product._id || product.name;
        const isWishlisted = wishlist.includes(productId);

        return (

          <div className="product-card" key={productId}>

            <div className="wishlist-button">

              <button onClick={() => toggleWishlist(productId)}>
                {isWishlisted ? "❤️" : "🤍"}
              </button>

            </div>

            <div className="product-image">

              <img
                src={resolveImage(product.image)}
                alt={product.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = noImage;
                }}
              />

            </div>

            <div className="product-meta">

              <h3>{product.name}</h3>

              <p className="brand">
                {product.brand}
              </p>

              <p className="category">
                {product.category}
              </p>

              <div className="price-row">

                <span className="price">
                  ₹{product.price}
                </span>

                {product.discount > 0 && (
                  <span className="discount">
                    {product.discount}% OFF
                  </span>
                )}

              </div>

              <p
                className={
                  product.stock > 0
                    ? "stock in-stock"
                    : "stock out-of-stock"
                }
              >
                {product.stock > 0
                  ? "In Stock"
                  : "Out of Stock"}
              </p>

            </div>

            <div className="card-actions">

              <button onClick={() => addToCart(product)}>
                Add to Cart
              </button>

              <button
                className="view-btn"
                onClick={() => setSelectedProduct(product)}
              >
                View Details
              </button>

            </div>

          </div>

        );

      })

    )}

  </div>

  <div className="cart-section">

    <h2>Shopping Cart</h2>

    {cart.length === 0 ? (

      <p className="empty-cart">
        Your cart is empty.
      </p>

    ) : (

      <>

        {cart.map((item) => (

          <div
            className="cart-item"
            key={item._id}
          >

            <img
              src={resolveImage(item.image)}
              alt={item.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = noImage;
              }}
            />

            <div className="cart-details">

              <h4>{item.name}</h4>

              <p>{item.brand}</p>

              <p>₹{item.price}</p>

              <div className="quantity-box">

                <button
                  onClick={() => decreaseQuantity(item._id)}
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => increaseQuantity(item._id)}
                >
                  +
                </button>

              </div>

            </div>

            <button
              className="remove-btn"
              onClick={() => removeFromCart(item._id)}
            >
              Remove
            </button>

          </div>

        ))}

        <div className="cart-footer">

          <h2 className="total">
            Total : ₹{total}
          </h2>

          <button
  className="checkout-btn"
  onClick={() => {
    if (cart.length === 0) return;

    setOrderPlaced(true);
    setCart([]);

    setTimeout(() => {
      setOrderPlaced(false);
    }, 2500);
  }}
>
  Proceed to Checkout
</button>

        </div>
    
      </>

    )}

  </div>

</div>
{orderPlaced && (
  <div className="success-popup">
    ✅ Order Placed Successfully!
  </div>
)}

<footer className="footer">
  <h3>👟 Shoe Square</h3>
  <p>Your one-stop destination for stylish footwear.</p>
  <p>© 2026 Shoe Square. All Rights Reserved.</p>
</footer>
{selectedProduct && (

  <div className="modal">

    <div className="modal-content">

      <img
        src={resolveImage(selectedProduct.image)}
        alt={selectedProduct.name}
      />

      <h2>{selectedProduct.name}</h2>

      <p>{selectedProduct.description}</p>

      <p>
        <strong>Brand:</strong> {selectedProduct.brand}
      </p>

      <p>
        <strong>Category:</strong> {selectedProduct.category}
      </p>

      <p>
        <strong>Price:</strong> ₹{selectedProduct.price}
      </p>

      <p>
        <strong>Available Sizes:</strong>{" "}
        {selectedProduct.sizes.join(", ")}
      </p>

      <button
        onClick={() => setSelectedProduct(null)}
      >
        Close
      </button>

    </div>

  </div>

)}
    </>
  );
}

export default Footwear;
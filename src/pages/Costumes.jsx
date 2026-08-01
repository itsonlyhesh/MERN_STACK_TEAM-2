// export default Costumes;
import "./Costumes.css";

import {
  FaShoppingBag,
  FaSearch,
  FaUserCircle,
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaTruck,
  FaUndo,
  FaShieldAlt,
  FaHeadset,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";

import { useEffect, useMemo, useState } from "react";

import api from "../api/api";


// ================= HERO IMAGE =================

import heroImage from "../assets/costumes/banners/banner.png";


// ================= CATEGORY IMAGES =================

import mensImage from "../assets/costumes/categories/mens.jpg";
import womenImage from "../assets/costumes/categories/women.jpg";
import kidsImage from "../assets/costumes/categories/kids.jpg";
import ethnicImage from "../assets/costumes/categories/ethnic.jpg";
import casualImage from "../assets/costumes/categories/casual.jpg";
import formalImage from "../assets/costumes/categories/formal.jpg";
import partyImage from "../assets/costumes/categories/party.jpg";
import winterImage from "../assets/costumes/categories/winter.jpg";
import traditionalImage from "../assets/costumes/categories/traditional.jpg";


// ================= PRODUCT IMAGES =================

import casualShirt from "../assets/costumes/products/casual-shirt.jpg";
import formalShirt from "../assets/costumes/products/formal-shirt.jpg";
import tshirt from "../assets/costumes/products/tshirt.jpg";
import jeans from "../assets/costumes/products/jeans.jpg";
import kurti from "../assets/costumes/products/kurti.jpg";
import saree from "../assets/costumes/products/saree.jpg";
import lehenga from "../assets/costumes/products/lehenga.jpg";
import partyDress from "../assets/costumes/products/party-dress.jpg";
import topImage from "../assets/costumes/products/top.jpg";
import blazer from "../assets/costumes/products/blazer.jpg";
import hoodie from "../assets/costumes/products/hoodie.jpg";
import kidsDress from "../assets/costumes/products/kids-dress.jpg";


// ================= TRENDING IMAGES =================

import weddingTrend from "../assets/costumes/trending/wedding.jpg";
import festiveTrend from "../assets/costumes/trending/festive.jpg";
import streetTrend from "../assets/costumes/trending/streetstyle.jpg";
import luxuryTrend from "../assets/costumes/trending/luxury.jpg";


// ================= NEW ARRIVAL IMAGES =================

import sweatshirt from "../assets/costumes/newarrivals/sweatshirt.jpg";
import printedKurti from "../assets/costumes/newarrivals/printed-kurti.jpg";
import weddingSaree from "../assets/costumes/newarrivals/wedding-saree.jpg";
import denimJacket from "../assets/costumes/newarrivals/denim-jacket.jpg";
import cottonShirt from "../assets/costumes/newarrivals/cotton-shirt.jpg";
import anarkali from "../assets/costumes/newarrivals/anarkali.jpg";



// ================= IMAGE MAP =================

const imageMap = {


  // categories

  "mens.jpg": mensImage,
  "women.jpg": womenImage,
  "kids.jpg": kidsImage,
  "ethnic.jpg": ethnicImage,
  "casual.jpg": casualImage,
  "formal.jpg": formalImage,
  "party.jpg": partyImage,
  "winter.jpg": winterImage,
  "traditional.jpg": traditionalImage,


  // products

  "shirt.jpg": casualShirt,
  "formalshirt.jpg": formalShirt,
  "tshirt.jpg": tshirt,
  "jeans.jpg": jeans,
  "kurti.jpg": kurti,
  "saree.jpg": saree,
  "lehenga.jpg": lehenga,
  "dress.jpg": partyDress,
  "top.jpg": topImage,
  "blazer.jpg": blazer,
  "hoodie.jpg": hoodie,
  "kidsdress.jpg": kidsDress,


  // trending

  "wedding.jpg": weddingTrend,
  "festive.jpg": festiveTrend,
  "streetstyle.jpg": streetTrend,
  "luxury.jpg": luxuryTrend,


  // new arrivals (MATCHING DATABASE)

  "sweatshirt.jpg": sweatshirt,
  "printedkurti.jpg": printedKurti,
  "weddingsaree.jpg": weddingSaree,
  "jacket.jpg": denimJacket,
  "cottonshirt.jpg": cottonShirt,
  "anarkali.jpg": anarkali

};



// ================= SAFE IMAGE FUNCTION =================


const getImage = (image)=>{

  if(!image)
    return sweatshirt;


  const fileName = image
    .split("/")
    .pop()
    .toLowerCase();


  return imageMap[fileName] || sweatshirt;

};




// ================= COMPONENT =================


const getProductKey = (product) => product._id || product.id || product.name;

const matchesCategory = (product, selectedCategory) => {
  if (selectedCategory === "All") return true;
  if (product.category === selectedCategory) return true;

  const name = (product.name || product.title || "").toLowerCase();
  const categoryMatchers = {
    "Men's Wear": ["shirt", "jeans", "jacket", "sweatshirt", "blazer", "hoodie"],
    "Women's Wear": ["kurti", "saree", "lehenga", "dress", "top", "anarkali"],
    "Kids Wear": ["kids", "child"],
  };

  return (categoryMatchers[selectedCategory] || []).some((term) => name.includes(term));
};

function Costumes(){


const [categories,setCategories] = useState([]);

const [featuredProducts,setFeaturedProducts] = useState([]);

const [trendingProducts,setTrendingProducts] = useState([]);

const [newArrivals,setNewArrivals] = useState([]);

const [offers,setOffers] = useState([]);
const [allProducts, setAllProducts] = useState([]);

const [searchTerm, setSearchTerm] = useState("");
const [selectedCategory, setSelectedCategory] = useState("All");
const [cart, setCart] = useState([]);
const [wishlist, setWishlist] = useState([]);
const [isCartOpen, setIsCartOpen] = useState(false);
const [isWishlistOpen, setIsWishlistOpen] = useState(false);
const [quickViewProduct, setQuickViewProduct] = useState(null);

const filteredFeaturedProducts = useMemo(
  () => featuredProducts.filter((product) => {
    const name = (product.name || product.title || "").toLowerCase();
    return matchesCategory(product, selectedCategory) && name.includes(searchTerm.toLowerCase());
  }),
  [featuredProducts, searchTerm, selectedCategory]
);

const filteredTrendingProducts = useMemo(
  () => trendingProducts.filter((product) => {
    const name = (product.name || product.title || "").toLowerCase();
    return matchesCategory(product, selectedCategory) && name.includes(searchTerm.toLowerCase());
  }),
  [trendingProducts, searchTerm, selectedCategory]
);

const filteredNewArrivals = useMemo(
  () => newArrivals.filter((product) => {
    const name = (product.name || product.title || "").toLowerCase();
    return matchesCategory(product, selectedCategory) && name.includes(searchTerm.toLowerCase());
  }),
  [newArrivals, searchTerm, selectedCategory]
);

const filteredCatalog = useMemo(
  () => allProducts.filter((product) => {
    const name = (product.name || "").toLowerCase();
    return matchesCategory(product, selectedCategory) && name.includes(searchTerm.toLowerCase());
  }),
  [allProducts, searchTerm, selectedCategory]
);

const cartCount = useMemo(
  () => cart.reduce((total, item) => total + item.quantity, 0),
  [cart]
);

const cartTotal = useMemo(
  () => cart.reduce((total, item) => total + (Number(item.price) || 0) * item.quantity, 0),
  [cart]
);

const addToCart = (product) => {
  const productKey = getProductKey(product);
  setCart((currentCart) => {
    const existingItem = currentCart.find((item) => getProductKey(item) === productKey);
    if (existingItem) {
      return currentCart.map((item) => getProductKey(item) === productKey
        ? { ...item, quantity: item.quantity + 1 }
        : item);
    }
    return [...currentCart, { ...product, quantity: 1 }];
  });
};

const updateCartQuantity = (productKey, amount) => {
  setCart((currentCart) => currentCart
    .map((item) => getProductKey(item) === productKey
      ? { ...item, quantity: item.quantity + amount }
      : item)
    .filter((item) => item.quantity > 0));
};

const removeFromCart = (productKey) => {
  setCart((currentCart) => currentCart.filter((item) => getProductKey(item) !== productKey));
};

const toggleWishlist = (product) => {
  const productKey = getProductKey(product);
  setWishlist((currentWishlist) => currentWishlist.some((item) => getProductKey(item) === productKey)
    ? currentWishlist.filter((item) => getProductKey(item) !== productKey)
    : [...currentWishlist, product]);
};

const isWishlisted = (product) => wishlist.some((item) => getProductKey(item) === getProductKey(product));

const hasSearchResults = filteredCatalog.length;




// ================= API CALL =================


useEffect(()=>{


const loadData = async()=>{


try{


const categoryData =
await api.get("/categories");


const featuredData =
await api.get("/products/featured");

const catalogData =
await api.get("/products");


const trendingData =
await api.get("/products/trending");


const arrivalData =
await api.get("/products/new-arrivals");


const offerData =
await api.get("/offers");



setCategories(categoryData.data);

setFeaturedProducts(featuredData.data);

setAllProducts(catalogData.data);

setTrendingProducts(trendingData.data);

setNewArrivals(arrivalData.data);

setOffers(offerData.data);



}

catch(error){

console.log(
"Backend Error:",
error
);

}


};


loadData();


},[]);



return (

<>


{/* ================= NAVBAR ================= */}


<nav className="navbar">


<div className="logo">

<FaShoppingBag/>

<span>
Fashion Hub
</span>

</div>



<ul className="nav-links">


<li>
<a href="#home">
Home
</a>
</li>


<li>
<a href="#categories">
Categories
</a>
</li>


<li>
<a href="#featured">
Collections
</a>
</li>


<li>
<a href="#offers">
Offers
</a>
</li>


<li>
<a href="#contact">
Contact
</a>
</li>


</ul>




<div className="nav-icons">


<div className="search-box">
<FaSearch/>
<input
type="search"
value={searchTerm}
onChange={(event) => setSearchTerm(event.target.value)}
placeholder="Search products"
aria-label="Search products"
/>
</div>


<button className="icon-btn icon-count-btn" onClick={() => setIsWishlistOpen(true)} aria-label="Open wishlist">
<FaHeart/>
{wishlist.length > 0 && <span className="icon-count">{wishlist.length}</span>}
</button>


<button className="icon-btn icon-count-btn" onClick={() => setIsCartOpen(true)} aria-label="Open cart">
<FaShoppingCart/>
{cartCount > 0 && <span className="icon-count">{cartCount}</span>}
</button>


<button className="icon-btn">
<FaUserCircle/>
</button>


</div>


</nav>





{/* ================= HERO ================= */}


<section
className="hero"
id="home"
>


<img
src={heroImage}
alt="Fashion Banner"
className="hero-image"
/>


<div className="hero-overlay"></div>



<div className="hero-content">


<p className="subtitle">
NEW ARRIVALS 2026
</p>

<span className="offer-badge">UP TO 50% OFF</span>


<h1>
Discover Your
<br/>
Perfect Outfit
</h1>


<p className="description">

Explore premium clothing collections for Men,
Women and Kids with elegant fashion,
affordable prices and the latest trends.

</p>



<a href="#featured">

<button>
Shop Now
</button>

</a>

<a href="#catalog" className="secondary-hero-link">

<button>
Explore Collections
</button>

</a>



</div>


</section>
{/* ================= CATEGORY SECTION ================= */}


<section
className="categories"
id="categories"
>


<h2 className="section-title">
Shop By Category
</h2>


<p className="section-subtitle">
Fashion collections for every occasion.
</p>



<div className="category-grid">

<div
className={`category-card category-filter-card ${selectedCategory === "All" ? "selected-category" : ""}`}
onClick={() => setSelectedCategory("All")}
role="button"
tabIndex="0"
onKeyDown={(event) => event.key === "Enter" && setSelectedCategory("All")}
>
<div className="category-info">
<h3>All</h3>
<button type="button">Explore</button>
</div>
</div>


{

categories.map((category)=>(


<div
 className={`category-card ${selectedCategory === category.name ? "selected-category" : ""}`}
 key={category._id}
 onClick={() => setSelectedCategory(category.name)}
 role="button"
 tabIndex="0"
 onKeyDown={(event) => event.key === "Enter" && setSelectedCategory(category.name)}
>


<div className="category-image">


<img

src={getImage(category.image)}

alt={category.name}

/>


</div>



<div className="category-info">


<h3>
{category.name}
</h3>



<a href="#catalog">

<button type="button">
Explore
</button>

</a>


</div>


</div>


))

}


</div>


</section>





{/* ================= ALL CATALOG ================= */}

<section className="featured catalog-section" id="catalog">
<h2 className="section-title">{searchTerm ? "Search Results" : "Shop All Styles"}</h2>
<p className="section-subtitle">{selectedCategory === "All" ? "Curated clothing for every wardrobe." : selectedCategory}</p>
{!hasSearchResults && <p className="empty-state">No matching products found.</p>}
<div className="product-grid">
{filteredCatalog.slice(0, searchTerm ? filteredCatalog.length : 12).map((product) => (
<div className="product-card professional-card" key={getProductKey(product)}>
<div className="product-image"><img src={getImage(product.image)} alt={product.name} /></div>
<div className="product-content">
<p className="product-brand">{product.brand}</p>
<h3>{product.name}</h3>
<div className="rating">{[...Array(product.rating || 0)].map((_, index) => <FaStar key={index} />)}</div>
<div className="price-row"><p className="price">₹{product.price}</p><span className="original-price">₹{product.originalPrice}</span><span className="discount-label">{product.discount}% OFF</span></div>
<div className="size-list">{(product.availableSizes || []).slice(0, 4).map((size) => <span key={size}>{size}</span>)}</div>
<div className="product-actions">
<button className="cart-btn" onClick={() => addToCart(product)}><FaShoppingCart/>Add to Cart</button>
<button className={`wishlist-btn ${isWishlisted(product) ? "wishlisted" : ""}`} onClick={() => toggleWishlist(product)} aria-label={`Toggle ${product.name} wishlist`}><FaHeart/></button>
</div>
<button className="quick-view-btn" onClick={() => setQuickViewProduct(product)}>Quick View</button>
</div>
</div>
))}
</div>
</section>

{/* ================= FEATURED COLLECTION ================= */}



<section
className="featured"
id="featured"
>


<h2 className="section-title">
Featured Collection
</h2>


<p className="section-subtitle">
Best selling outfits this season.
</p>

{searchTerm && !hasSearchResults && (
<p className="empty-state">No matching products found.</p>
)}




<div className="product-grid">



{

filteredFeaturedProducts.map((product)=>(


<div

className="product-card"

key={product._id}

>



<div className="product-image">


<img

src={getImage(product.image)}

alt={product.name}

/>


</div>





<div className="product-content">


<h3>
{product.name}
</h3>



<div className="rating">


{

[...Array(product.rating || 0)]
.map((_,index)=>(

<FaStar
key={index}
/>

))

}


</div>




<p className="price">

₹{product.price}

</p>





<div className="product-actions">


<button className="cart-btn" onClick={() => addToCart(product)}>

<FaShoppingCart/>

Add to Cart

</button>



<button
className={`wishlist-btn ${isWishlisted(product) ? "wishlisted" : ""}`}
onClick={() => toggleWishlist(product)}
aria-label={`Toggle ${product.name} wishlist`}
>

<FaHeart/>

</button>


</div>



</div>



</div>



))


}



</div>


</section>






{/* ================= TRENDING COLLECTION ================= */}

<section className="trending">

  <h2 className="section-title">
    Trending Collection
  </h2>

  <p className="section-subtitle">
    Explore the latest fashion trends loved by everyone.
  </p>


  <div className="trending-grid">

    {filteredTrendingProducts.map((item) => (

      <div
        className="trend-card"
        key={item._id || item.id}
      >


        <div className="trend-image">

          <img
          src={getImage(item.image)}
          alt={item.title || item.name}
          />

        </div>


        {/* TREND NAME */}

        

          <div className="trend-content">

              <h3>
                  {item.title || item.name}
              </h3>

              <a href="#featured">

                  <button>
                      Explore
                  </button>

              </a>



        </div>


      </div>

    ))}

  </div>


</section>
            {/* ================= OFFER BANNER ================= */}


      <section

      className="offers"

      id="offers"

      >



      {

      offers.length > 0 && (

      <>



      <h2>

      🔥 {offers[0].title}

      </h2>





      <h1>

      {offers[0].discount}

      </h1>





      <p>

      {offers[0].description}

      </p>






      <a href="#featured">


      <button>

      Shop Now

      </button>



      </a>




      </>


      )

      }





      </section>








{/* ================= NEW ARRIVALS ================= */}



<section className="new-arrivals">



<h2 className="section-title">

New Arrivals

</h2>




<p className="section-subtitle">

Fresh styles added for you.

</p>





<div className="arrival-grid">



{

filteredNewArrivals.map((item)=>(



<div

className="arrival-card"

key={item._id}

>



<div className="arrival-image">


<img

src={getImage(item.image)}

alt={item.name}

/>


</div>





<div className="arrival-content">


<h3>

{item.name}

</h3>





<div className="rating">


{

[...Array(item.rating || 0)]
.map((_,index)=>(


<FaStar

key={index}

/>


))

}


</div>






<p className="price">

₹{item.price}

</p>







<div className="product-actions">



<button

className="cart-btn"
onClick={() => addToCart(item)}

>


<FaShoppingCart/>

Add to Cart


</button>





<button

className={`wishlist-btn ${isWishlisted(item) ? "wishlisted" : ""}`}
onClick={() => toggleWishlist(item)}
aria-label={`Toggle ${item.name} wishlist`}

>


<FaHeart/>


</button>



</div>





</div>




</div>



))


}



</div>




</section>








{/* ================= NEWSLETTER AND BENEFITS ================= */}

<section className="benefits-section">
<div><FaTruck/><h3>Free Delivery</h3><p>On orders above ₹999</p></div>
<div><FaUndo/><h3>Easy Returns</h3><p>Simple 7-day returns</p></div>
<div><FaShieldAlt/><h3>Secure Shopping</h3><p>Your details stay protected</p></div>
<div><FaHeadset/><h3>24x7 Support</h3><p>Always here to help</p></div>
</section>

<section className="newsletter-section">
<div><p className="subtitle">STYLE NOTES</p><h2>Get fashion updates in your inbox</h2><p>Be first to know about new arrivals, exclusive deals and seasonal edits.</p></div>
<form className="newsletter-form" onSubmit={(event) => event.preventDefault()}>
<input type="email" placeholder="Your email address" aria-label="Email address" required />
<button type="submit">Subscribe</button>
</form>
</section>

{/* ================= CART AND WISHLIST SIDEBARS ================= */}

{quickViewProduct && (
<div className="modal-backdrop" onClick={() => setQuickViewProduct(null)}>
<div className="quick-view-modal" onClick={(event) => event.stopPropagation()}>
<button className="sidebar-close modal-close" onClick={() => setQuickViewProduct(null)} aria-label="Close quick view">×</button>
<div className="quick-view-image"><img src={getImage(quickViewProduct.image)} alt={quickViewProduct.name} /></div>
<div className="quick-view-details">
<p className="product-brand">{quickViewProduct.brand}</p>
<h2>{quickViewProduct.name}</h2>
<div className="rating">{[...Array(quickViewProduct.rating || 0)].map((_, index) => <FaStar key={index} />)}</div>
<p className="quick-price">₹{quickViewProduct.price} <span>₹{quickViewProduct.originalPrice}</span> <em>{quickViewProduct.discount}% OFF</em></p>
<p className="quick-description">{quickViewProduct.description}</p>
<div className="quick-meta"><strong>Sizes:</strong> {(quickViewProduct.availableSizes || []).join(" · ")}</div>
<div className="quick-meta"><strong>Colours:</strong> {(quickViewProduct.availableColors || []).join(" · ")}</div>
<div className="quick-meta"><strong>Stock:</strong> {quickViewProduct.stock} available</div>
<div className="product-actions">
<button className="cart-btn" onClick={() => addToCart(quickViewProduct)}><FaShoppingCart/>Add to Cart</button>
<button className={`wishlist-btn ${isWishlisted(quickViewProduct) ? "wishlisted" : ""}`} onClick={() => toggleWishlist(quickViewProduct)} aria-label="Toggle wishlist"><FaHeart/></button>
</div>
</div>
</div>
</div>
)}

<div
className={`sidebar-overlay ${isCartOpen || isWishlistOpen ? "visible" : ""}`}
onClick={() => { setIsCartOpen(false); setIsWishlistOpen(false); }}
/>

<aside className={`shop-sidebar ${isCartOpen ? "sidebar-open" : ""}`} aria-hidden={!isCartOpen}>
<div className="sidebar-header">
<h2>Your Cart</h2>
<button className="sidebar-close" onClick={() => setIsCartOpen(false)} aria-label="Close cart">×</button>
</div>
<div className="sidebar-items">
{cart.length === 0 ? <p className="empty-state">Your cart is empty.</p> : cart.map((item) => (
<div className="sidebar-item" key={getProductKey(item)}>
<img src={getImage(item.image)} alt={item.name} />
<div className="sidebar-item-info">
<h3>{item.name}</h3>
<p>₹{item.price}</p>
<div className="quantity-controls">
<button onClick={() => updateCartQuantity(getProductKey(item), -1)} aria-label={`Decrease ${item.name} quantity`}>−</button>
<span>{item.quantity}</span>
<button onClick={() => updateCartQuantity(getProductKey(item), 1)} aria-label={`Increase ${item.name} quantity`}>+</button>
</div>
</div>
<button className="remove-btn" onClick={() => removeFromCart(getProductKey(item))}>Remove</button>
</div>
))}
</div>
<div className="sidebar-summary">
<p><span>Subtotal</span><strong>₹{cartTotal.toLocaleString()}</strong></p>
<p><span>Estimated Delivery</span><strong>Free</strong></p>
<p className="grand-total"><span>Grand Total</span><strong>₹{cartTotal.toLocaleString()}</strong></p>
<div className="sidebar-actions">
<button className="continue-btn" onClick={() => setIsCartOpen(false)}>Continue Shopping</button>
<button className="checkout-btn">Checkout</button>
</div>
</div>
</aside>

<aside className={`shop-sidebar wishlist-sidebar ${isWishlistOpen ? "sidebar-open" : ""}`} aria-hidden={!isWishlistOpen}>
<div className="sidebar-header">
<h2>Wishlist</h2>
<button className="sidebar-close" onClick={() => setIsWishlistOpen(false)} aria-label="Close wishlist">×</button>
</div>
<div className="sidebar-items">
{wishlist.length === 0 ? <p className="empty-state">No wishlist items.</p> : wishlist.map((item) => (
<div className="sidebar-item" key={getProductKey(item)}>
<img src={getImage(item.image)} alt={item.name} />
<div className="sidebar-item-info"><h3>{item.name}</h3><p>₹{item.price}</p></div>
<button className="remove-btn" onClick={() => toggleWishlist(item)}>Remove</button>
</div>
))}
</div>
</aside>


{/* ================= FOOTER ================= */}



<footer

className="footer"

id="contact"

>



<h2>

Fashion Hub

</h2>




<p>

Your destination for premium fashion collections.

</p>

<div className="footer-columns">
<div><h3>Quick Links</h3><a href="#home">Home</a><a href="#catalog">Shop All</a><a href="#offers">Offers</a></div>
<div><h3>Customer Support</h3><a href="#contact">Contact Us</a><a href="#categories">Size Guide</a><a href="#contact">Returns</a></div>
<div><h3>Policies</h3><a href="#contact">Shipping Policy</a><a href="#contact">Privacy Policy</a><a href="#contact">Terms of Use</a></div>
<div><h3>Follow Us</h3><div className="social-links"><a href="#contact" aria-label="Instagram"><FaInstagram/></a><a href="#contact" aria-label="Facebook"><FaFacebookF/></a><a href="#contact" aria-label="Twitter"><FaTwitter/></a></div><p>support@fashionhub.in</p></div>
</div>





<div className="footer-links">



<a href="#home">

Home

</a>




<a href="#categories">

Categories

</a>





<a href="#featured">

Collections

</a>





<a href="#offers">

Offers

</a>





<a href="#contact">

Contact

</a>




</div>






<p className="copyright">


© 2026 Fashion Hub. All Rights Reserved.


</p>





</footer>



</>

);


}



export default Costumes;

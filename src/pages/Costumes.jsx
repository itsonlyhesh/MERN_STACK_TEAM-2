// import "./Costumes.css";

// import {
//   FaShoppingBag,
//   FaSearch,
//   FaUserCircle,
//   FaHeart,
//   FaShoppingCart,
//   FaStar,
// } from "react-icons/fa";

// // ================= HERO IMAGE =================

// import heroImage from "../assets/costumes/banners/banner.png";

// // ================= CATEGORY IMAGES =================

// import mensImage from "../assets/costumes/categories/mens.jpg";
// import womenImage from "../assets/costumes/categories/women.jpg";
// import kidsImage from "../assets/costumes/categories/kids.jpg";
// import ethnicImage from "../assets/costumes/categories/ethnic.jpg";
// import casualImage from "../assets/costumes/categories/casual.jpg";
// import formalImage from "../assets/costumes/categories/formal.jpg";
// import partyImage from "../assets/costumes/categories/party.jpg";
// import winterImage from "../assets/costumes/categories/winter.jpg";
// import traditionalImage from "../assets/costumes/categories/traditional.jpg";

// // ================= FEATURED PRODUCT IMAGES =================

// import casualShirt from "../assets/costumes/products/casual-shirt.jpg";
// import formalShirt from "../assets/costumes/products/formal-shirt.jpg";
// import tshirt from "../assets/costumes/products/tshirt.jpg";
// import jeans from "../assets/costumes/products/jeans.jpg";
// import kurti from "../assets/costumes/products/kurti.jpg";
// import saree from "../assets/costumes/products/saree.jpg";
// import lehenga from "../assets/costumes/products/lehenga.jpg";
// import partyDress from "../assets/costumes/products/party-dress.jpg";
// import topImage from "../assets/costumes/products/top.jpg";
// import blazer from "../assets/costumes/products/blazer.jpg";
// import hoodie from "../assets/costumes/products/hoodie.jpg";
// import kidsDress from "../assets/costumes/products/kids-dress.jpg";

// // ================= TRENDING IMAGES =================

// import weddingTrend from "../assets/costumes/trending/wedding.jpg";
// import festiveTrend from "../assets/costumes/trending/festive.jpg";
// import streetStyleTrend from "../assets/costumes/trending/streetstyle.jpg";
// import luxuryTrend from "../assets/costumes/trending/luxury.jpg";

// // ================= NEW ARRIVAL IMAGES =================

// import sweatshirt from "../assets/costumes/newarrivals/sweatshirt.jpg";
// import printedKurti from "../assets/costumes/newarrivals/printed-kurti.jpg";
// import weddingSaree from "../assets/costumes/newarrivals/wedding-saree.jpg";
// import denimJacket from "../assets/costumes/newarrivals/denim-jacket.jpg";
// import cottonShirt from "../assets/costumes/newarrivals/cotton-shirt.jpg";
// import anarkali from "../assets/costumes/newarrivals/anarkali.jpg";

// // ================= CATEGORY DATA =================

// const categories = [
//   { id: 1, name: "Men's Wear", image: mensImage },
//   { id: 2, name: "Women's Wear", image: womenImage },
//   { id: 3, name: "Kids Wear", image: kidsImage },
//   { id: 4, name: "Ethnic Wear", image: ethnicImage },
//   { id: 5, name: "Casual Wear", image: casualImage },
//   { id: 6, name: "Formal Wear", image: formalImage },
//   { id: 7, name: "Party Wear", image: partyImage },
//   { id: 8, name: "Winter Wear", image: winterImage },
//   { id: 9, name: "Traditional Wear", image: traditionalImage },
// ];

// // ================= FEATURED PRODUCTS =================

// const featuredProducts = [
//   {
//     id: 1,
//     name: "Men's Casual Shirt",
//     image: casualShirt,
//     price: "₹999",
//     rating: 4,
//   },
//   {
//     id: 2,
//     name: "Men's Formal Shirt",
//     image: formalShirt,
//     price: "₹1,499",
//     rating: 5,
//   },
//   {
//     id: 3,
//     name: "Cotton T-Shirt",
//     image: tshirt,
//     price: "₹699",
//     rating: 4,
//   },
//   {
//     id: 4,
//     name: "Denim Jeans",
//     image: jeans,
//     price: "₹1,899",
//     rating: 5,
//   },
//   {
//     id: 5,
//     name: "Women's Kurti",
//     image: kurti,
//     price: "₹1,299",
//     rating: 5,
//   },
//   {
//     id: 6,
//     name: "Cotton Saree",
//     image: saree,
//     price: "₹2,499",
//     rating: 4,
//   },
//   {
//     id: 7,
//     name: "Designer Lehenga",
//     image: lehenga,
//     price: "₹6,999",
//     rating: 5,
//   },
//   {
//     id: 8,
//     name: "Party Wear Dress",
//     image: partyDress,
//     price: "₹3,499",
//     rating: 5,
//   },
//   {
//     id: 9,
//     name: "Women's Top",
//     image: topImage,
//     price: "₹899",
//     rating: 4,
//   },
//   {
//     id: 10,
//     name: "Formal Blazer",
//     image: blazer,
//     price: "₹4,999",
//     rating: 5,
//   },
//   {
//     id: 11,
//     name: "Winter Hoodie",
//     image: hoodie,
//     price: "₹2,299",
//     rating: 4,
//   },
//   {
//     id: 12,
//     name: "Kids Party Dress",
//     image: kidsDress,
//     price: "₹1,799",
//     rating: 5,
//   },
// ];
// // ================= TRENDING COLLECTION =================

// const trendingProducts = [
//   {
//     id: 1,
//     title: "Wedding Collection",
//     image: weddingTrend,
//   },
//   {
//     id: 2,
//     title: "Festive Fashion",
//     image: festiveTrend,
//   },
//   {
//     id: 3,
//     title: "Street Style",
//     image: streetStyleTrend,
//   },
//   {
//     id: 4,
//     title: "Luxury Collection",
//     image: luxuryTrend,
//   },
// ];

// // ================= NEW ARRIVALS =================

// const newArrivals = [
//   {
//     id: 1,
//     name: "Casual Sweatshirt",
//     image: sweatshirt,
//     price: "₹2,199",
//     rating: 5,
//   },
//   {
//     id: 2,
//     name: "Printed Kurti",
//     image: printedKurti,
//     price: "₹1,099",
//     rating: 4,
//   },
//   {
//     id: 3,
//     name: "Wedding Saree",
//     image: weddingSaree,
//     price: "₹4,999",
//     rating: 5,
//   },
//   {
//     id: 4,
//     name: "Denim Jacket",
//     image: denimJacket,
//     price: "₹3,299",
//     rating: 5,
//   },
//   {
//     id: 5,
//     name: "Cotton Shirt",
//     image: cottonShirt,
//     price: "₹899",
//     rating: 4,
//   },
//   {
//     id: 6,
//     name: "Anarkali Dress",
//     image: anarkali,
//     price: "₹3,999",
//     rating: 5,
//   },
// ];

// function Costumes() {
//   return (
//     <>

//       {/* ================= NAVBAR ================= */}

//       <nav className="navbar">

//         <div className="logo">
//           <FaShoppingBag />
//           <span>Fashion Hub</span>
//         </div>

//         <ul className="nav-links">

//           <li>
//             <a href="#home">Home</a>
//           </li>

//           <li>
//             <a href="#categories">Categories</a>
//           </li>

//           <li>
//             <a href="#featured">Collections</a>
//           </li>

//           <li>
//             <a href="#offers">Offers</a>
//           </li>

//           <li>
//             <a href="#contact">Contact</a>
//           </li>

//         </ul>

//         <div className="nav-icons">

//           <button className="icon-btn">
//             <FaSearch />
//           </button>

//           <button className="icon-btn">
//             <FaShoppingCart />
//           </button>

//           <button className="icon-btn">
//             <FaUserCircle />
//           </button>

//         </div>

//       </nav>

//       {/* ================= HERO ================= */}

//       <section
//         className="hero"
//         id="home"
//       >

//         <img
//           src={heroImage}
//           alt="Fashion Banner"
//           className="hero-image"
//         />

//         <div className="hero-overlay"></div>

//         <div className="hero-content">

//           <p className="subtitle">
//             NEW ARRIVALS 2026
//           </p>

//           <h1>
//             Discover Your
//             <br />
//             Perfect Outfit
//           </h1>

//           <p className="description">
//             Explore premium clothing collections for Men,
//             Women and Kids with elegant fashion,
//             affordable prices and the latest trends.
//           </p>

//           <a href="#featured">
//             <button>
//               Shop Now
//             </button>
//           </a>

//         </div>

//       </section>

//       {/* ================= SHOP BY CATEGORY ================= */}

//       <section
//         className="categories"
//         id="categories"
//       >

//         <h2 className="section-title">
//           Shop By Category
//         </h2>

//         <p className="section-subtitle">
//           Fashion collections for every occasion.
//         </p>

//         <div className="category-grid">

//           {categories.map((category) => (

//             <div
//               className="category-card"
//               key={category.id}
//             >

//               <div className="category-image">

//                 <img
//                   src={category.image}
//                   alt={category.name}
//                 />

//               </div>

//               <div className="category-info">

//                 <h3>
//                   {category.name}
//                 </h3>

//                 <a href="#featured">
//                   <button>
//                     Explore
//                   </button>
//                 </a>

//               </div>

//             </div>

//           ))}

//         </div>

//       </section>
//             {/* ================= FEATURED COLLECTION ================= */}

//       <section
//         className="featured"
//         id="featured"
//       >

//         <h2 className="section-title">
//           Featured Collection
//         </h2>

//         <p className="section-subtitle">
//           Best selling outfits this season.
//         </p>

//         <div className="product-grid">

//           {featuredProducts.map((product) => (

//             <div
//               className="product-card"
//               key={product.id}
//             >

//               <div className="product-image">

//                 <img
//                   src={product.image}
//                   alt={product.name}
//                 />

//               </div>

//               <div className="product-content">

//                 <h3>
//                   {product.name}
//                 </h3>

//                 <div className="rating">

//                   {[...Array(product.rating)].map((_, index) => (
//                     <FaStar key={index} />
//                   ))}

//                 </div>

//                 <p className="price">
//                   {product.price}
//                 </p>

//                 <div className="product-actions">

//                   <button className="cart-btn">

//                     <FaShoppingCart />

//                     Add to Cart

//                   </button>

//                   <button className="wishlist-btn">

//                     <FaHeart />

//                   </button>

//                 </div>

//               </div>

//             </div>

//           ))}

//         </div>

//       </section>



//       {/* ================= TRENDING COLLECTION ================= */}

//       <section className="trending">

//         <h2 className="section-title">
//           Trending Collection
//         </h2>

//         <p className="section-subtitle">
//           Explore the latest fashion trends loved by everyone.
//         </p>

//         <div className="trending-grid">

//           {trendingProducts.map((item) => (

//             <div
//               className="trend-card"
//               key={item.id}
//             >

//               <div className="trend-image">

//                 <img
//                   src={item.image}
//                   alt={item.title}
//                 />

//               </div>

//               <h3>
//                 {item.title}
//               </h3>

//               <a href="#featured">

//                 <button>

//                   Explore

//                 </button>

//               </a>

//             </div>

//           ))}

//         </div>

//       </section>



//       {/* ================= OFFER BANNER ================= */}

//       <section
//         className="offers"
//         id="offers"
//       >

//         <h2>
//           🔥 Fashion Festival Sale
//         </h2>

//         <h1>
//           UP TO 50% OFF
//         </h1>

//         <p>
//           Starting from ₹499
//         </p>

//         <a href="#featured">

//           <button>

//             Shop Now

//           </button>

//         </a>

//       </section>
//             {/* ================= NEW ARRIVALS ================= */}

//       <section className="new-arrivals">

//         <h2 className="section-title">
//           New Arrivals
//         </h2>

//         <p className="section-subtitle">
//           Fresh styles added for you.
//         </p>

//         <div className="arrival-grid">

//           {newArrivals.map((item) => (

//             <div
//               className="arrival-card"
//               key={item.id}
//             >

//               <div className="arrival-image">

//                 <img
//                   src={item.image}
//                   alt={item.name}
//                 />

//               </div>

//               <div className="arrival-content">

//                 <h3>
//                   {item.name}
//                 </h3>

//                 <div className="rating">

//                   {[...Array(item.rating)].map((_, index) => (

//                     <FaStar key={index} />

//                   ))}

//                 </div>

//                 <p className="price">

//                   {item.price}

//                 </p>

//                 <div className="product-actions">

//                   <button className="cart-btn">

//                     <FaShoppingCart />

//                     Add to Cart

//                   </button>

//                   <button className="wishlist-btn">

//                     <FaHeart />

//                   </button>

//                 </div>

//               </div>

//             </div>

//           ))}

//         </div>

//       </section>



//       {/* ================= FOOTER ================= */}

//       <footer
//         className="footer"
//         id="contact"
//       >

//         <h2>
//           Fashion Hub
//         </h2>

//         <p>
//           Your destination for premium fashion collections.
//         </p>

//         <div className="footer-links">

//           <a href="#home">
//             Home
//           </a>

//           <a href="#categories">
//             Categories
//           </a>

//           <a href="#featured">
//             Collections
//           </a>

//           <a href="#offers">
//             Offers
//           </a>

//           <a href="#contact">
//             Contact
//           </a>

//         </div>

//         <p className="copyright">

//           © 2026 Fashion Hub. All Rights Reserved.

//         </p>

//       </footer>

//     </>
//   );

// }

// export default Costumes;
// import "./Costumes.css";

// import {
//   FaShoppingBag,
//   FaSearch,
//   FaUserCircle,
//   FaHeart,
//   FaShoppingCart,
//   FaStar,
// } from "react-icons/fa";


// import { useEffect, useState } from "react";

// import api from "../api/api";


// // ================= HERO IMAGE =================

// import heroImage from "../assets/costumes/banners/banner.png";


// // ================= FALLBACK IMAGES =================

// import mensImage from "../assets/costumes/categories/mens.jpg";
// import womenImage from "../assets/costumes/categories/women.jpg";
// import kidsImage from "../assets/costumes/categories/kids.jpg";
// import ethnicImage from "../assets/costumes/categories/ethnic.jpg";
// import casualImage from "../assets/costumes/categories/casual.jpg";
// import formalImage from "../assets/costumes/categories/formal.jpg";
// import partyImage from "../assets/costumes/categories/party.jpg";
// import winterImage from "../assets/costumes/categories/winter.jpg";
// import traditionalImage from "../assets/costumes/categories/traditional.jpg";


// import casualShirt from "../assets/costumes/products/casual-shirt.jpg";
// import formalShirt from "../assets/costumes/products/formal-shirt.jpg";
// import tshirt from "../assets/costumes/products/tshirt.jpg";
// import jeans from "../assets/costumes/products/jeans.jpg";
// import kurti from "../assets/costumes/products/kurti.jpg";
// import saree from "../assets/costumes/products/saree.jpg";


// import weddingTrend from "../assets/costumes/trending/wedding.jpg";
// import festiveTrend from "../assets/costumes/trending/festive.jpg";
// import streetTrend from "../assets/costumes/trending/streetstyle.jpg";
// import luxuryTrend from "../assets/costumes/trending/luxury.jpg";


// import sweatshirt from "../assets/costumes/newarrivals/sweatshirt.jpg";
// import printedKurti from "../assets/costumes/newarrivals/printed-kurti.jpg";
// import weddingSaree from "../assets/costumes/newarrivals/wedding-saree.jpg";



// // ================= IMAGE MAPPER =================


// const imageMap = {


// "mens.jpg":mensImage,
// "women.jpg":womenImage,
// "kids.jpg":kidsImage,
// "ethnic.jpg":ethnicImage,
// "casual.jpg":casualImage,
// "formal.jpg":formalImage,
// "party.jpg":partyImage,
// "winter.jpg":winterImage,
// "traditional.jpg":traditionalImage,


// "casual-shirt.jpg":casualShirt,
// "formal-shirt.jpg":formalShirt,
// "tshirt.jpg":tshirt,
// "jeans.jpg":jeans,
// "kurti.jpg":kurti,
// "saree.jpg":saree,


// "wedding.jpg":weddingTrend,
// "festive.jpg":festiveTrend,
// "streetstyle.jpg":streetTrend,
// "luxury.jpg":luxuryTrend,


// "sweatshirt.jpg":sweatshirt,
// "printed-kurti.jpg":printedKurti,
// "wedding-saree.jpg":weddingSaree

// };




// function Costumes(){


// const [categories,setCategories]=useState([]);

// const [featuredProducts,setFeaturedProducts]=useState([]);

// const [trendingProducts,setTrendingProducts]=useState([]);

// const [newArrivals,setNewArrivals]=useState([]);

// const [offers,setOffers]=useState([]);




// useEffect(()=>{


// const loadData=async()=>{


// try{


// const categoryData =
// await api.get("/categories");


// const featuredData =
// await api.get("/products/featured");


// const trendingData =
// await api.get("/products/trending");


// const arrivalData =
// await api.get("/products/new-arrivals");


// const offerData =
// await api.get("/offers");



// setCategories(categoryData.data);

// setFeaturedProducts(featuredData.data);

// setTrendingProducts(trendingData.data);

// setNewArrivals(arrivalData.data);

// setOffers(offerData.data);



// }

// catch(error){

// console.log(
// "Backend Error:",
// error
// );

// }



// };


// loadData();


// },[]);



// return (

// <>      {/* ================= NAVBAR ================= */}

//       <nav className="navbar">


//         <div className="logo">

//           <FaShoppingBag />

//           <span>
//             Fashion Hub
//           </span>

//         </div>



//         <ul className="nav-links">


//           <li>
//             <a href="#home">
//               Home
//             </a>
//           </li>


//           <li>
//             <a href="#categories">
//               Categories
//             </a>
//           </li>


//           <li>
//             <a href="#featured">
//               Collections
//             </a>
//           </li>


//           <li>
//             <a href="#offers">
//               Offers
//             </a>
//           </li>


//           <li>
//             <a href="#contact">
//               Contact
//             </a>
//           </li>


//         </ul>




//         <div className="nav-icons">


//           <button className="icon-btn">

//             <FaSearch />

//           </button>



//           <button className="icon-btn">

//             <FaShoppingCart />

//           </button>



//           <button className="icon-btn">

//             <FaUserCircle />

//           </button>



//         </div>



//       </nav>





//       {/* ================= HERO ================= */}


//       <section
//       className="hero"
//       id="home"
//       >



//         <img

//         src={heroImage}

//         alt="Fashion Banner"

//         className="hero-image"

//         />



//         <div className="hero-overlay"></div>




//         <div className="hero-content">


//           <p className="subtitle">

//           NEW ARRIVALS 2026

//           </p>




//           <h1>

//           Discover Your

//           <br/>

//           Perfect Outfit

//           </h1>



//           <p className="description">


//           Explore premium clothing collections for Men,
//           Women and Kids with elegant fashion,
//           affordable prices and the latest trends.


//           </p>




//           <a href="#featured">


//           <button>

//           Shop Now

//           </button>


//           </a>



//         </div>



//       </section>







//       {/* ================= CATEGORY SECTION ================= */}



//       <section

//       className="categories"

//       id="categories"

//       >



//       <h2 className="section-title">

//       Shop By Category

//       </h2>




//       <p className="section-subtitle">

//       Fashion collections for every occasion.

//       </p>





//       <div className="category-grid">



//       {

//       categories.map((category)=>(



//       <div

//       className="category-card"

//       key={category._id}

//       >




//       <div className="category-image">


//       <img

//       src={
//       imageMap[category.image] ||
//       mensImage
//       }

//       alt={category.name}

//       />


//       </div>





//       <div className="category-info">



//       <h3>

//       {category.name}

//       </h3>





//       <a href="#featured">


//       <button>

//       Explore

//       </button>



//       </a>



//       </div>





//       </div>



//       ))



//       }




//       </div>




//       </section>
//             {/* ================= FEATURED COLLECTION ================= */}


//       <section
//       className="featured"
//       id="featured"
//       >



//       <h2 className="section-title">

//       Featured Collection

//       </h2>



//       <p className="section-subtitle">

//       Best selling outfits this season.

//       </p>





//       <div className="product-grid">



//       {


//       featuredProducts.map((product)=>(



//       <div

//       className="product-card"

//       key={product._id}

//       >




//       <div className="product-image">



//       <img


//       src={
//       imageMap[product.image] ||
//       casualShirt
//       }


//       alt={product.name}


//       />



//       </div>






//       <div className="product-content">



//       <h3>

//       {product.name}

//       </h3>





//       <div className="rating">



//       {

//       [...Array(product.rating || 0)].map(
//       (_,index)=>(


//       <FaStar

//       key={index}

//       />


//       )

//       )

//       }



//       </div>






//       <p className="price">

//       ₹{product.price}

//       </p>







//       <div className="product-actions">



//       <button

//       className="cart-btn"

//       >


//       <FaShoppingCart/>

//       Add to Cart


//       </button>





//       <button

//       className="wishlist-btn"

//       >


//       <FaHeart/>


//       </button>



//       </div>






//       </div>




//       </div>



//       ))



//       }




//       </div>





//       </section>








//       {/* ================= TRENDING COLLECTION ================= */}



//       <section className="trending">





//       <h2 className="section-title">

//       Trending Collection

//       </h2>





//       <p className="section-subtitle">

//       Explore the latest fashion trends loved by everyone.

//       </p>








//       <div className="trending-grid">





//       {


//       trendingProducts.map((item)=>(




//       <div

//       className="trend-card"

//       key={item._id}

//       >





//       <div className="trend-image">





//       <img


//       src={
//       imageMap[item.image] ||
//       weddingTrend
//       }


//       alt={item.title}


//       />





//       </div>





//       <h3>

//       {item.title}

//       </h3>






//       <a href="#featured">



//       <button>


//       Explore


//       </button>



//       </a>






//       </div>





//       ))



//       }





//       </div>






//       </section>
      //       {/* ================= OFFER BANNER ================= */}


      // <section

      // className="offers"

      // id="offers"

      // >



      // {

      // offers.length > 0 && (

      // <>



      // <h2>

      // 🔥 {offers[0].title}

      // </h2>





      // <h1>

      // {offers[0].discount}

      // </h1>





      // <p>

      // {offers[0].description}

      // </p>






      // <a href="#featured">


      // <button>

      // Shop Now

      // </button>



      // </a>




      // </>


      // )

      // }





      // </section>








//       {/* ================= NEW ARRIVALS ================= */}



//       <section className="new-arrivals">





//       <h2 className="section-title">

//       New Arrivals

//       </h2>





//       <p className="section-subtitle">

//       Fresh styles added for you.

//       </p>







//       <div className="arrival-grid">






//       {


//       newArrivals.map((item)=>(





//       <div

//       className="arrival-card"

//       key={item._id}

//       >





//       <div className="arrival-image">



//       <img


//       src={
//       imageMap[item.image] ||
//       sweatshirt
//       }


//       alt={item.name}


//       />




//       </div>








//       <div className="arrival-content">





//       <h3>

//       {item.name}

//       </h3>






//       <div className="rating">





//       {

//       [...Array(item.rating || 0)].map(
//       (_,index)=>(


//       <FaStar

//       key={index}

//       />


//       )

//       )

//       }






//       </div>






//       <p className="price">

//       ₹{item.price}

//       </p>







//       <div className="product-actions">



//       <button

//       className="cart-btn"

//       >


//       <FaShoppingCart/>

//       Add to Cart



//       </button>





//       <button

//       className="wishlist-btn"

//       >



//       <FaHeart/>



//       </button>





//       </div>







//       </div>






//       </div>






//       ))





//       }





//       </div>







//       </section>









//       {/* ================= FOOTER ================= */}



//       <footer

//       className="footer"

//       id="contact"

//       >




//       <h2>

//       Fashion Hub

//       </h2>





//       <p>

//       Your destination for premium fashion collections.

//       </p>






//       <div className="footer-links">



//       <a href="#home">

//       Home

//       </a>




//       <a href="#categories">

//       Categories

//       </a>





//       <a href="#featured">

//       Collections

//       </a>





//       <a href="#offers">

//       Offers

//       </a>





//       <a href="#contact">

//       Contact

//       </a>





//       </div>







//       <p className="copyright">


//       © 2026 Fashion Hub. All Rights Reserved.


//       </p>





//       </footer>






// </>

// );


// }



// export default Costumes;
import "./Costumes.css";

import {
  FaShoppingBag,
  FaSearch,
  FaUserCircle,
  FaHeart,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";

import { useEffect, useState } from "react";

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


function Costumes(){


const [categories,setCategories] = useState([]);

const [featuredProducts,setFeaturedProducts] = useState([]);

const [trendingProducts,setTrendingProducts] = useState([]);

const [newArrivals,setNewArrivals] = useState([]);

const [offers,setOffers] = useState([]);




// ================= API CALL =================


useEffect(()=>{


const loadData = async()=>{


try{


const categoryData =
await api.get("/categories");


const featuredData =
await api.get("/products/featured");


const trendingData =
await api.get("/products/trending");


const arrivalData =
await api.get("/products/new-arrivals");


const offerData =
await api.get("/offers");



setCategories(categoryData.data);

setFeaturedProducts(featuredData.data);

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


<button className="icon-btn">
<FaSearch/>
</button>


<button className="icon-btn">
<FaShoppingCart/>
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



</div>


</section>
// ================= CATEGORY SECTION =================


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


{

categories.map((category)=>(


<div
className="category-card"
key={category._id}
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



<a href="#featured">

<button>
Explore
</button>

</a>


</div>


</div>


))

}


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




<div className="product-grid">



{

featuredProducts.map((product)=>(


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


<button className="cart-btn">

<FaShoppingCart/>

Add to Cart

</button>



<button className="wishlist-btn">

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

    {trendingProducts.map((item) => (

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

newArrivals.map((item)=>(



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

>


<FaShoppingCart/>

Add to Cart


</button>





<button

className="wishlist-btn"

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
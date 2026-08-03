import { useMemo, useState } from "react";
import {
  FaShoppingBag,
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaEye,
  FaTimes,
  FaMinus,
  FaPlus,
  FaTruck,
  FaShieldAlt,
  FaExchangeAlt,
  FaHeadset,
  FaTag,
} from "react-icons/fa";
import menCategoryImage from "../assets/costumes/categories/mens.jpg";
import womenCategoryImage from "../assets/costumes/categories/women.jpg";
import kidsCategoryImage from "../assets/costumes/categories/kids.jpg";
import ethnicCategoryImage from "../assets/costumes/categories/ethnic.jpg";
import casualCategoryImage from "../assets/costumes/categories/casual.jpg";
import formalCategoryImage from "../assets/costumes/categories/formal.jpg";
import partyCategoryImage from "../assets/costumes/categories/party.jpg";
import winterCategoryImage from "../assets/costumes/categories/winter.jpg";
import heroBannerImage from "../assets/costumes/banners/banner.png";
import newArrivalAnarkaliImage from "../assets/costumes/newarrivals/anarkali.jpg";
import newArrivalCottonShirtImage from "../assets/costumes/newarrivals/cotton-shirt.jpg";
import newArrivalDenimJacketImage from "../assets/costumes/newarrivals/denim-jacket.jpg";
import newArrivalPrintedKurtiImage from "../assets/costumes/newarrivals/printed-kurti.jpg";
import newArrivalSweatshirtImage from "../assets/costumes/newarrivals/sweatshirt.jpg";
import newArrivalWeddingSareeImage from "../assets/costumes/newarrivals/wedding-saree.jpg";
import blazerProductImage from "../assets/costumes/products/blazer.jpg";
import casualShirtProductImage from "../assets/costumes/products/casual-shirt.jpg";
import formalShirtProductImage from "../assets/costumes/products/formal-shirt.jpg";
import hoodieProductImage from "../assets/costumes/products/hoodie.jpg";
import jeansProductImage from "../assets/costumes/products/jeans.jpg";
import kidsDressProductImage from "../assets/costumes/products/kids-dress.jpg";
import kurtiProductImage from "../assets/costumes/products/kurti.jpg";
import lehengaProductImage from "../assets/costumes/products/lehenga.jpg";
import partyDressProductImage from "../assets/costumes/products/party-dress.jpg";
import sareeProductImage from "../assets/costumes/products/saree.jpg";
import topProductImage from "../assets/costumes/products/top.jpg";
import tshirtProductImage from "../assets/costumes/products/tshirt.jpg";
import "./CostumesStore.css";

const categories = [
  { id: 1, name: "Men's Wear", image: menCategoryImage, tag: "Tailored staples" },
  { id: 2, name: "Women's Wear", image: womenCategoryImage, tag: "Iconic essentials" },
  { id: 3, name: "Kids Wear", image: kidsCategoryImage, tag: "Playful comfort" },
  { id: 4, name: "Ethnic Wear", image: ethnicCategoryImage, tag: "Festive elegance" },
  { id: 5, name: "Casual Wear", image: casualCategoryImage, tag: "Easy everyday style" },
  { id: 6, name: "Formal Wear", image: formalCategoryImage, tag: "Sharp confidence" },
  { id: 7, name: "Party Wear", image: partyCategoryImage, tag: "Evening glamour" },
  { id: 8, name: "Winter Wear", image: winterCategoryImage, tag: "Layered warmth" },
];

const offers = [
  { title: "Today's Deals", text: "Fresh picks under ₹999", badge: "Up to 60% off" },
  { title: "Festival Sale", text: "Grand festive looks for every mood", badge: "Flat 50% off" },
  { title: "Weekend Sale", text: "Buy 2 get 1 on select essentials", badge: "Limited time" },
];

const newArrivals = [
  { id: 1, name: "Cotton Shirt", description: "Lightweight premium shirt", image: newArrivalCottonShirtImage },
  { id: 2, name: "Printed Kurti", description: "Fresh festive staple", image: newArrivalPrintedKurtiImage },
  { id: 3, name: "Denim Jacket", description: "Layer up in style", image: newArrivalDenimJacketImage },
  { id: 4, name: "Wedding Saree", description: "Elegant celebration wear", image: newArrivalWeddingSareeImage },
  { id: 5, name: "Sweatshirt", description: "Comfy everyday comfort", image: newArrivalSweatshirtImage },
  { id: 6, name: "Anarkali", description: "Graceful statement look", image: newArrivalAnarkaliImage },
];

const fallbackImageUrl = "/images/placeholder-clothing.svg";

const productImageCatalog = {

  // Men's Wear
  "casual shirts":
    "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=80",

  "formal shirts":
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80",

  "printed shirts":
    "https://images.unsplash.com/photo-1627225924765-552d49cf47ad?auto=format&fit=crop&w=900&q=80",

  "t-shirts":
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",

  "jeans":
    "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80",

  "hoodies":
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",

  "blazers":
    "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=900&q=80",


  // Women's Wear
  "tops":
    "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=80",


 "kurtis":
  "https://images.unsplash.com/photo-1597983073493-88cd35cf93ca?auto=format&fit=crop&w=900&q=80",

  "sarees":
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",

  "lehengas":
    "https://images.unsplash.com/photo-1583391733971-0c7f8b7b8a3c?auto=format&fit=crop&w=900&q=80",

  "dresses":
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80",

  "palazzos":
    "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=900&q=80",

  "jumpsuits":
    "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=900&q=80",


  // Kids Wear
  "boys shirts":
    "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=80",

  "girls dresses":
    "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=900&q=80",

  "boys jeans":
    "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=900&q=80",

  "girls kurtis":
    "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=80",


  // Ethnic Wear
  "kurta sets":
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80",

  "lehenga":
    "https://images.unsplash.com/photo-1597983073493-88cd35cf93ca?auto=format&fit=crop&w=900&q=80",

  "anarkali":
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",

  "saree":
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",


  // Casual Wear
  "joggers":
    "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=900&q=80",

  "shorts":
    "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&w=900&q=80",

  "casual dresses":
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",


  // Winter Wear
  "sweatshirts":
    "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=900&q=80",

  "sweaters":
    "https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=900&q=80",

  "coats":
    "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=900&q=80",

  "jackets":
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80"

};

const productBlueprints = [
  { category: "Men's Wear", subcategory: "Casual Shirts", name: "Men's Slim Fit Oxford Cotton Shirt", brand: "Van Heusen", basePrice: 1799, discount: 18, colors: ["Navy", "White"], sizes: ["S", "M", "L", "XL"], fabric: "Cotton", repeats: 7 },
  { category: "Men's Wear", subcategory: "Formal Shirts", name: "Men's Linen Formal Shirt", brand: "Louis Philippe", basePrice: 2199, discount: 20, colors: ["Blue", "Stone"], sizes: ["S", "M", "L", "XL"], fabric: "Linen", repeats: 6 },
  { category: "Men's Wear", subcategory: "Printed Shirts", name: "Men's Checked Flannel Shirt", brand: "Allen Solly", basePrice: 1999, discount: 16, colors: ["Coral", "Mustard"], sizes: ["S", "M", "L"], fabric: "Flannel", repeats: 6 },
  { category: "Men's Wear", subcategory: "T-Shirts", name: "Men's Solid Polo T-Shirt", brand: "Roadster", basePrice: 1199, discount: 12, colors: ["Black", "Grey"], sizes: ["S", "M", "L", "XL"], fabric: "Cotton", repeats: 7 },
  { category: "Men's Wear", subcategory: "Jeans", name: "Men's Slim Fit Cargo Jeans", brand: "Levi's", basePrice: 2699, discount: 22, colors: ["Indigo", "Midnight"], sizes: ["30", "32", "34", "36"], fabric: "Denim", repeats: 6 },
  { category: "Men's Wear", subcategory: "Hoodies", name: "Men's Winter Fleece Hoodie", brand: "Wrogn", basePrice: 2499, discount: 18, colors: ["Olive", "Charcoal"], sizes: ["S", "M", "L", "XL"], fabric: "Fleece", repeats: 6 },
  { category: "Men's Wear", subcategory: "Blazers", name: "Men's Tailored Blazer", brand: "Peter England", basePrice: 3999, discount: 24, colors: ["Charcoal", "Navy"], sizes: ["M", "L", "XL"], fabric: "Wool Blend", repeats: 6 },
  { category: "Men's Wear", subcategory: "Kurta", name: "Men's Classic Kurta", brand: "Manyavar", basePrice: 2799, discount: 15, colors: ["Cream", "Rust"], sizes: ["S", "M", "L", "XL"], fabric: "Rayon", repeats: 6 },
  { category: "Men's Wear", subcategory: "Sherwani", name: "Men's Royal Sherwani", brand: "Moksh", basePrice: 7999, discount: 28, colors: ["Maroon", "Gold"], sizes: ["S", "M", "L"], fabric: "Silk Blend", repeats: 5 },
  { category: "Women's Wear", subcategory: "Tops", name: "Women's Printed Top", brand: "H&M", basePrice: 1499, discount: 14, colors: ["Rose", "Lilac"], sizes: ["XS", "S", "M", "L"], fabric: "Viscose", repeats: 7 },
  { category: "Women's Wear", subcategory: "Kurtis", name: "Women's Floral Printed Kurti", brand: "Biba", basePrice: 1899, discount: 16, colors: ["Mustard", "Olive"], sizes: ["XS", "S", "M", "L"], fabric: "Cotton", repeats: 6 },
  { category: "Women's Wear", subcategory: "Sarees", name: "Women's Banarasi Silk Saree", brand: "Maya Moda", basePrice: 3999, discount: 22, colors: ["Wine", "Emerald"], sizes: ["Free", "One Size"], fabric: "Silk", repeats: 6 },
  { category: "Women's Wear", subcategory: "Lehengas", name: "Women's Designer Lehenga", brand: "Zara", basePrice: 5499, discount: 25, colors: ["Pink", "Peach"], sizes: ["XS", "S", "M", "L"], fabric: "Georgette", repeats: 6 },
  { category: "Women's Wear", subcategory: "Dresses", name: "Women's Anarkali Dress", brand: "Aurelia", basePrice: 2999, discount: 20, colors: ["Black", "Sage"], sizes: ["XS", "S", "M", "L"], fabric: "Crepe", repeats: 6 },
  { category: "Women's Wear", subcategory: "Palazzos", name: "Women's Cotton Palazzo Set", brand: "Campus Sutra", basePrice: 1799, discount: 15, colors: ["Sand", "Mauve"], sizes: ["XS", "S", "M", "L"], fabric: "Chiffon", repeats: 6 },
  { category: "Women's Wear", subcategory: "Jeans", name: "Women's Slim Fit Denim Jeans", brand: "Levi's", basePrice: 2499, discount: 18, colors: ["Blue", "Black"], sizes: ["24", "26", "28", "30"], fabric: "Denim", repeats: 6 },
  { category: "Women's Wear", subcategory: "Jumpsuits", name: "Women's Wide Leg Jumpsuit", brand: "Atelier 9", basePrice: 3299, discount: 21, colors: ["Plum", "Ivory"], sizes: ["XS", "S", "M", "L"], fabric: "Viscose", repeats: 6 },
  { category: "Women's Wear", subcategory: "Hoodies", name: "Women's Layered Hoodie", brand: "Urban Outfitters", basePrice: 2399, discount: 17, colors: ["Navy", "Camel"], sizes: ["XS", "S", "M", "L"], fabric: "Fleece", repeats: 6 },
  { category: "Kids Wear", subcategory: "Boys Shirts", name: "Boys Checked Shirt", brand: "Tiny Trend", basePrice: 1099, discount: 12, colors: ["Sky", "Mint"], sizes: ["2Y", "3Y", "4Y", "5Y"], fabric: "Cotton", repeats: 6 },
  { category: "Kids Wear", subcategory: "Girls Dresses", name: "Girls Floral Frock", brand: "Little Luxe", basePrice: 1399, discount: 14, colors: ["Pink", "Lilac"], sizes: ["2Y", "3Y", "4Y", "5Y"], fabric: "Cotton", repeats: 6 },
  { category: "Kids Wear", subcategory: "Boys Jeans", name: "Boys Cargo Shorts", brand: "Mini Mode", basePrice: 1299, discount: 13, colors: ["Blue", "Black"], sizes: ["2Y", "3Y", "4Y", "5Y"], fabric: "Denim", repeats: 6 },
  { category: "Kids Wear", subcategory: "Girls Kurtis", name: "Girls Party Dress", brand: "Kidz Chic", basePrice: 1499, discount: 15, colors: ["Coral", "Turquoise"], sizes: ["2Y", "3Y", "4Y", "5Y"], fabric: "Cotton", repeats: 6 },
  { category: "Kids Wear", subcategory: "Kids Winter Wear", name: "Kids Winter Hoodie", brand: "Snowberry", basePrice: 1999, discount: 18, colors: ["Grey", "Cream"], sizes: ["2Y", "3Y", "4Y", "5Y"], fabric: "Wool Blend", repeats: 6 },
  { category: "Ethnic Wear", subcategory: "Kurta Sets", name: "Floral Kurta Set", brand: "Aarav", basePrice: 2899, discount: 19, colors: ["Indigo", "Mustard"], sizes: ["S", "M", "L", "XL"], fabric: "Cotton Silk", repeats: 6 },
  { category: "Ethnic Wear", subcategory: "Lehenga", name: "Designer Lehenga Choli", brand: "Maanvi", basePrice: 6499, discount: 26, colors: ["Maroon", "Gold"], sizes: ["XS", "S", "M", "L"], fabric: "Net", repeats: 6 },
  { category: "Ethnic Wear", subcategory: "Anarkali", name: "Embroidered Anarkali Dress", brand: "Saanvi", basePrice: 3599, discount: 21, colors: ["Deep Green", "Burgundy"], sizes: ["XS", "S", "M", "L"], fabric: "Georgette", repeats: 6 },
  { category: "Ethnic Wear", subcategory: "Saree", name: "Banarasi Tissue Saree", brand: "Maya Moda", basePrice: 4999, discount: 24, colors: ["Royal Blue", "Wine"], sizes: ["Free", "One Size"], fabric: "Silk", repeats: 6 },
  { category: "Ethnic Wear", subcategory: "Dupatta Sets", name: "Organza Dupatta Set", brand: "Vedic", basePrice: 2399, discount: 16, colors: ["Pink", "Ivory"], sizes: ["S", "M", "L", "XL"], fabric: "Chiffon", repeats: 6 },
  { category: "Casual Wear", subcategory: "T-Shirts", name: "Weekend Knit T-Shirt", brand: "H&M", basePrice: 1099, discount: 10, colors: ["White", "Teal"], sizes: ["S", "M", "L", "XL"], fabric: "Cotton", repeats: 6 },
  { category: "Casual Wear", subcategory: "Jeans", name: "Relaxed Casual Denim Jeans", brand: "Levi's", basePrice: 2199, discount: 14, colors: ["Light Blue", "Black"], sizes: ["28", "30", "32", "34"], fabric: "Denim", repeats: 6 },
  { category: "Casual Wear", subcategory: "Joggers", name: "Soft French Terry Joggers", brand: "Nike", basePrice: 1699, discount: 13, colors: ["Grey", "Navy"], sizes: ["S", "M", "L", "XL"], fabric: "French Terry", repeats: 6 },
  { category: "Casual Wear", subcategory: "Shorts", name: "Casual Linen Shorts", brand: "Campus Sutra", basePrice: 1199, discount: 11, colors: ["Khaki", "Olive"], sizes: ["S", "M", "L", "XL"], fabric: "Cotton", repeats: 6 },
  { category: "Casual Wear", subcategory: "Casual Dresses", name: "Soft Casual Midi Dress", brand: "Zara", basePrice: 1799, discount: 15, colors: ["Sage", "Coral"], sizes: ["XS", "S", "M", "L"], fabric: "Rayon", repeats: 6 },
  { category: "Formal Wear", subcategory: "Formal Shirts", name: "Executive Cotton Formal Shirt", brand: "Van Heusen", basePrice: 2499, discount: 18, colors: ["White", "Sky"], sizes: ["S", "M", "L", "XL"], fabric: "Cotton", repeats: 6 },
  { category: "Formal Wear", subcategory: "Formal Pants", name: "Tailored Wool Trousers", brand: "Peter England", basePrice: 2999, discount: 20, colors: ["Charcoal", "Black"], sizes: ["28", "30", "32", "34"], fabric: "Wool Blend", repeats: 6 },
  { category: "Formal Wear", subcategory: "Blazers", name: "Sharp Tailored Blazer", brand: "Allen Solly", basePrice: 4699, discount: 25, colors: ["Midnight", "Tan"], sizes: ["M", "L", "XL"], fabric: "Wool Blend", repeats: 6 },
  { category: "Formal Wear", subcategory: "Suits", name: "Business Formal Suit", brand: "Louis Philippe", basePrice: 7299, discount: 27, colors: ["Navy", "Black"], sizes: ["M", "L", "XL"], fabric: "Twill", repeats: 6 },
  { category: "Formal Wear", subcategory: "Formal Dresses", name: "Formal Satin Midi Dress", brand: "Aurelia", basePrice: 3499, discount: 22, colors: ["Emerald", "Black"], sizes: ["XS", "S", "M", "L"], fabric: "Satin", repeats: 6 },
  { category: "Party Wear", subcategory: "Party Dresses", name: "Glam Party Dress", brand: "Zara", basePrice: 3999, discount: 23, colors: ["Ruby", "Emerald"], sizes: ["XS", "S", "M", "L"], fabric: "Satin", repeats: 6 },
  { category: "Party Wear", subcategory: "Designer Gowns", name: "Designer Net Gown", brand: "Biba", basePrice: 5699, discount: 28, colors: ["Plum", "Gold"], sizes: ["XS", "S", "M", "L"], fabric: "Net", repeats: 6 },
  { category: "Party Wear", subcategory: "Designer Sarees", name: "Designer Silk Saree", brand: "Maya Moda", basePrice: 6499, discount: 29, colors: ["Silver", "Burgundy"], sizes: ["Free", "One Size"], fabric: "Silk", repeats: 6 },
  { category: "Party Wear", subcategory: "Party Shirts", name: "Party Modern Shirt", brand: "Van Heusen", basePrice: 2099, discount: 17, colors: ["White", "Black"], sizes: ["S", "M", "L", "XL"], fabric: "Poplin", repeats: 6 },
  { category: "Party Wear", subcategory: "Party Blazers", name: "Luxe Velvet Party Blazer", brand: "Aurelia", basePrice: 4399, discount: 24, colors: ["Jet Black", "Navy"], sizes: ["M", "L", "XL"], fabric: "Velvet", repeats: 6 },
  { category: "Winter Wear", subcategory: "Hoodies", name: "Classic Winter Hoodie", brand: "Northstar", basePrice: 2599, discount: 19, colors: ["Camel", "Grey"], sizes: ["S", "M", "L", "XL"], fabric: "Fleece", repeats: 6 },
  { category: "Winter Wear", subcategory: "Sweatshirts", name: "Classic French Terry Sweatshirt", brand: "Wrogn", basePrice: 2199, discount: 16, colors: ["Navy", "Cream"], sizes: ["S", "M", "L", "XL"], fabric: "French Terry", repeats: 6 },
  { category: "Winter Wear", subcategory: "Sweaters", name: "Fine Knit Wool Sweater", brand: "Northstar", basePrice: 2799, discount: 20, colors: ["Ash", "Wine"], sizes: ["S", "M", "L", "XL"], fabric: "Wool", repeats: 6 },
  { category: "Winter Wear", subcategory: "Coats", name: "Long Wool Winter Coat", brand: "Snowberry", basePrice: 5299, discount: 26, colors: ["Black", "Camel"], sizes: ["S", "M", "L", "XL"], fabric: "Wool Blend", repeats: 6 },
  { category: "Winter Wear", subcategory: "Jackets", name: "Insulated Puffer Jacket", brand: "Levi's", basePrice: 3699, discount: 22, colors: ["Olive", "Midnight"], sizes: ["S", "M", "L", "XL"], fabric: "Nylon", repeats: 6 },
];

const getProductImageUrl = (template) => {
  const searchText = `${template.subcategory} ${template.name}`.toLowerCase();

  if (searchText.includes("men's slim fit oxford cotton shirt") || searchText.includes("slim fit oxford cotton shirt")) {
    return "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSjw6svrLkPxQ1DZjkolpqf6HvYwb9yaCfGNdlWYpW_r6Xw7WNfwXq16HDIE5aZjGzITWU8bhRa7_bWtjE--A6GWXWHb5lbqQ4eQt6MJua9FePDV5bJndM";
  }

  const imageKeys = Object.keys(productImageCatalog);

  for (const key of imageKeys) {
    if (searchText.includes(key)) {
      return productImageCatalog[key];
    }
  }

  return "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80";
};

const products = productBlueprints.flatMap((template, blueprintIndex) =>
  Array.from({ length: template.repeats }, (_, index) => {
    const productIndex = blueprintIndex * 100 + index + 1;
    const variant = ["Classic", "Signature", "Premium", "Tailored", "Modern", "Edition"][index % 6];
    const name = `${template.name} ${variant}`;
    const price = template.basePrice + index * 120 + (blueprintIndex % 4) * 60;
    const originalPrice = price + 350 + (index % 4) * 140;
    const discount = Math.max(template.discount, 10 + (index % 6) * 2);
    const rating = Number((4.2 + (index % 6) * 0.2).toFixed(1));
    const sizes = template.sizes.slice(0, 2 + (index % 3));
    const colors = template.colors.slice(0, 1 + (index % 2));

    return {
      id: productIndex,
      name,
      brand: template.brand,
      category: template.category,
      subcategory: template.subcategory,
      description: `${template.fabric} crafted clothing designed for a polished look with comfort and everyday ease.`,
      price,
      originalPrice,
      discount,
      rating,
      stock: 8 + (index % 7) * 3,
      sizes,
      colors,
      fabric: template.fabric,
      image: getProductImageUrl(template),
      featured: index % 4 === 0,
      trending: index % 3 === 0,
      newArrival: index < 4,
      bestSeller: index % 5 === 0,
    };
  })
);

function formatPrice(value) {
  return `₹${value.toLocaleString("en-IN")}`;
}

function handleImageError(event) {
  event.target.onerror = null;
  event.target.src = fallbackImageUrl;
}

function CostumesStore() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [maxPrice, setMaxPrice] = useState(8000);
  const [selectedSize, setSelectedSize] = useState("All");
  const [selectedColor, setSelectedColor] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [quickViewItem, setQuickViewItem] = useState(null);

  const categoryOptions = useMemo(() => ["All", ...categories.map((category) => category.name)], []);
  const subCategoryOptions = useMemo(() => {
    const list = products.filter((product) => selectedCategory === "All" || product.category === selectedCategory).map((product) => product.subcategory);
    return ["All", ...new Set(list)];
  }, [selectedCategory]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const query = `${product.name} ${product.brand} ${product.category} ${product.subcategory} ${product.description}`.toLowerCase();
        const matchesSearch = query.includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
        const matchesSubCategory = selectedSubCategory === "All" || product.subcategory === selectedSubCategory;
        const matchesBrand = selectedBrand === "All" || product.brand === selectedBrand;
        const matchesPrice = product.price <= maxPrice;
        const matchesSize = selectedSize === "All" || product.sizes.includes(selectedSize);
        const matchesColor = selectedColor === "All" || product.colors.includes(selectedColor);
        return matchesSearch && matchesCategory && matchesSubCategory && matchesBrand && matchesPrice && matchesSize && matchesColor;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-asc": return a.price - b.price;
          case "price-desc": return b.price - a.price;
          case "rating": return b.rating - a.rating;
          case "newest": return Number(b.newArrival) - Number(a.newArrival);
          case "popular": return Number(b.bestSeller) - Number(a.bestSeller);
          case "discount": return b.discount - a.discount;
          default: return Number(b.featured) - Number(a.featured);
        }
      });
  }, [maxPrice, searchTerm, selectedBrand, selectedCategory, selectedColor, selectedSize, selectedSubCategory, sortBy]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;
  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const delivery = subtotal > 0 ? 99 : 0;
  const grandTotal = subtotal + delivery;

  const handleExploreCategory = (categoryName) => {
    setSelectedCategory(categoryName);
    setSelectedSubCategory("All");
  };

  const clearCategoryFilter = () => {
    setSelectedCategory("All");
    setSelectedSubCategory("All");
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedSubCategory("All");
  };

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) {
        return current.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...current, { product, quantity: 1 }];
    });
  };

  const changeQuantity = (productId, delta) => {
    setCart((current) => current.map((item) => (item.product.id === productId ? { ...item, quantity: item.quantity + delta } : item)).filter((item) => item.quantity > 0));
  };

  const removeFromCart = (productId) => {
    setCart((current) => current.filter((item) => item.product.id !== productId));
  };

  const toggleWishlist = (product) => {
    setWishlist((current) => (current.some((item) => item.id === product.id) ? current.filter((item) => item.id !== product.id) : [...current, product]));
  };

  return (
    <div className="store-shell">
      <nav className="navbar">
        <a className="logo" href="#home"><FaShoppingBag /><span>Fashion Hub</span></a>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#categories">Categories</a></li>
          <li><a href="#catalog">Catalog</a></li>
          <li><a href="#offers">Offers</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="nav-icons">
          <span className="icon-pill"><FaSearch /></span>
          <span className="icon-pill cart-pill"><FaShoppingCart /><strong>{cartCount}</strong></span>
        </div>
      </nav>

      <section className="hero" id="home">
        <img src={heroBannerImage} alt="Fashion hero" onError={handleImageError} />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">New arrivals 2026</p>
          <h1>Discover polished fashion with every click.</h1>
          <p>Elevated clothing for men, women, and kids with fresh seasonal edits and premium comfort.</p>
          <div className="hero-actions">
            <a href="#catalog" className="primary-btn">Shop Now</a>
            <a href="#offers" className="secondary-btn">View Offers</a>
          </div>
        </div>
      </section>

      <section className="highlights">
        <div className="highlight-card"><FaTruck /><div><strong>Free shipping</strong><p>Above ₹1499</p></div></div>
        <div className="highlight-card"><FaShieldAlt /><div><strong>Secure payments</strong><p>Protected checkout</p></div></div>
        <div className="highlight-card"><FaExchangeAlt /><div><strong>Easy returns</strong><p>7-day simple exchange</p></div></div>
        <div className="highlight-card"><FaHeadset /><div><strong>24/7 support</strong><p>Fashion experts</p></div></div>
      </section>

      <section className="categories" id="new-arrivals">
        <div className="section-header">
          <p className="eyebrow">New arrivals</p>
          <h2>Fresh picks for the season</h2>
          <p>Trending wardrobe essentials curated with the latest styles.</p>
        </div>
        <div className="category-grid">
          {newArrivals.map((item) => (
            <div className="category-card" key={item.id}>
              <img src={item.image} alt={item.name} onError={handleImageError} />
              <div className="category-info">
                <p>Just landed</p>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="categories" id="categories">
        <div className="section-header">
          <p className="eyebrow">Explore</p>
          <h2>Shop by category</h2>
          <p>Curated collections for every mood and season.</p>
        </div>
        <div className="category-grid">
          {categories.map((category) => {
            const isActive = selectedCategory === category.name;
            return (
              <div className={`category-card ${isActive ? "active-category" : ""}`} key={category.id}>
                <img src={category.image} alt={category.name} onError={handleImageError} />
                <div className="category-info">
                  <p>{category.tag}</p>
                  <h3>{category.name}</h3>
                  <button className={`secondary-btn ${isActive ? "active-filter-btn" : ""}`} onClick={() => handleExploreCategory(category.name)}>Explore</button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="category-status-banner">
          <div>
            <p className="eyebrow">Active collection</p>
            <h3>{selectedCategory === "All" ? "All Categories" : selectedCategory}</h3>
          </div>
          <p>{selectedCategory === "All" ? "Browse the full catalog across every collection." : `${filteredProducts.length} products ready to explore.`}</p>
        </div>
      </section>

      <section className="offers-section" id="offers">
        <div className="section-header">
          <p className="eyebrow">Deals</p>
          <h2>Fresh offers for your wardrobe</h2>
        </div>
        <div className="offer-grid">
          {offers.map((offer) => (
            <div className="offer-card" key={offer.title}>
              <div className="offer-icon"><FaTag /></div>
              <p className="offer-badge">{offer.badge}</p>
              <h3>{offer.title}</h3>
              <p>{offer.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="catalog" id="catalog">
        <div className="catalog-toolbar">
          <div>
            <p className="eyebrow">Catalog</p>
            <h2>Shop the latest looks</h2>
          </div>
          <div className="search-box"><FaSearch /><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search outfits, brands, fabrics..." /></div>
        </div>

        <div className="catalog-toolbar" style={{ marginTop: "-8px", marginBottom: "16px" }}>
          <div className="section-header" style={{ marginBottom: 0 }}>
            <p className="eyebrow">Current view</p>
            <h3>{selectedCategory === "All" ? "All Categories" : selectedCategory}</h3>
            <p>{filteredProducts.length} products shown</p>
          </div>
          <button className="secondary-btn" onClick={clearCategoryFilter}>All Categories</button>
        </div>

        <div className="filters-panel">
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="All">All Categories</option>
            {categoryOptions.slice(1).map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
          <select value={selectedSubCategory} onChange={(event) => setSelectedSubCategory(event.target.value)}>
            <option value="All">All Subcategories</option>
            {subCategoryOptions.slice(1).map((subcategory) => <option key={subcategory} value={subcategory}>{subcategory}</option>)}
          </select>
          <select value={selectedBrand} onChange={(event) => setSelectedBrand(event.target.value)}>
            <option value="All">All Brands</option>
            {[...new Set(products.map((product) => product.brand))].map((brand) => <option key={brand} value={brand}>{brand}</option>)}
          </select>
          <select value={selectedSize} onChange={(event) => setSelectedSize(event.target.value)}>
            <option value="All">All Sizes</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="24">24</option>
            <option value="26">26</option>
            <option value="28">28</option>
            <option value="30">30</option>
            <option value="32">32</option>
            <option value="34">34</option>
            <option value="36">36</option>
            <option value="2Y">2Y</option>
            <option value="3Y">3Y</option>
            <option value="4Y">4Y</option>
            <option value="5Y">5Y</option>
            <option value="Free">Free</option>
            <option value="One Size">One Size</option>
          </select>
          <select value={selectedColor} onChange={(event) => setSelectedColor(event.target.value)}>
            <option value="All">All Colors</option>
            <option value="Black">Black</option>
            <option value="Navy">Navy</option>
            <option value="White">White</option>
            <option value="Blue">Blue</option>
            <option value="Cream">Cream</option>
            <option value="Sand">Sand</option>
            <option value="Rose">Rose</option>
            <option value="Olive">Olive</option>
            <option value="Wine">Wine</option>
            <option value="Gold">Gold</option>
            <option value="Mustard">Mustard</option>
            <option value="Pink">Pink</option>
            <option value="Grey">Grey</option>
            <option value="Coral">Coral</option>
          </select>
          <label className="price-filter">
            <span>Max Price: {formatPrice(maxPrice)}</span>
            <input type="range" min="1000" max="8000" step="100" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} />
          </label>
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price Low to High</option>
            <option value="price-desc">Price High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
            <option value="popular">Popularity</option>
            <option value="discount">Discount</option>
          </select>
        </div>

        <div className="catalog-layout">
          <div className="product-grid">
            {filteredProducts.map((product) => {
              const inWishlist = wishlist.some((item) => item.id === product.id);
              return (
                <article className="product-card" key={product.id}>
                  <div className="product-media">
                    <img src={product.image} alt={product.name} onError={handleImageError} />
                    <button className={`wishlist-btn ${inWishlist ? "active" : ""}`} onClick={() => toggleWishlist(product)}><FaHeart /></button>
                    <div className="product-overlay"><button onClick={() => setQuickViewItem(product)}><FaEye /> Quick View</button></div>
                  </div>
                  <div className="product-info">
                    <div className="product-meta">
                      <span className="brand-pill">{product.brand}</span>
                      <span className="status-pill">{product.category}</span>
                      {product.newArrival ? <span className="status-pill">New Arrival</span> : null}
                      {product.trending ? <span className="status-pill">Trending</span> : null}
                    </div>
                    <h3>{product.name}</h3>
                    <p className="section-header" style={{ marginBottom: "8px" }}>{product.subcategory}</p>
                    <div className="rating-row"><div className="stars">{Array.from({ length: Math.round(product.rating) }, (_, index) => <FaStar key={`${product.id}-${index}`} />)}</div><span>{product.rating}</span></div>
                    <div className="price-row"><span className="current-price">{formatPrice(product.price)}</span><span className="original-price">{formatPrice(product.originalPrice)}</span><span className="discount-badge">-{product.discount}%</span></div>
                    <div className="sizes-row">{product.sizes.map((size) => <span key={`${product.id}-${size}`}>{size}</span>)}</div>
                    <div className="card-actions">
                      <button className="primary-btn" onClick={() => addToCart(product)}><FaShoppingCart /> Add to Cart</button>
                      <button className="secondary-btn icon-btn" onClick={() => toggleWishlist(product)}><FaHeart /></button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="cart-panel">
            <div className="panel-header"><div><p className="eyebrow">Bag</p><h3>Your cart</h3></div><span>{cartCount} items</span></div>
            <div className="wishlist-summary"><strong>Wishlist</strong><span>{wishlistCount} saved</span></div>
            {cart.length === 0 ? <div className="empty-state"><p>Your bag feels empty.</p><span>Add a few favorite outfits to begin.</span></div> : <div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.product.id}><img src={item.product.image} alt={item.product.name} onError={handleImageError} /><div className="cart-item-info"><h4>{item.product.name}</h4><p>{formatPrice(item.product.price)}</p><div className="quantity-row"><button onClick={() => changeQuantity(item.product.id, -1)}><FaMinus /></button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.product.id, 1)}><FaPlus /></button></div></div><button className="remove-btn" onClick={() => removeFromCart(item.product.id)}><FaTimes /></button></div>)}</div>}
            <div className="summary-card">
              <div className="summary-row"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
              <div className="summary-row"><span>Delivery</span><strong>{formatPrice(delivery)}</strong></div>
              <div className="summary-row total"><span>Grand Total</span><strong>{formatPrice(grandTotal)}</strong></div>
              <button className="primary-btn full-width">Checkout</button>
            </div>
          </aside>
        </div>
      </section>

      <section className="footer-cta" id="contact">
        <div>
          <p className="eyebrow">Style notes</p>
          <h2>Fashion tips, fresh drops, and thoughtful edits.</h2>
        </div>
        <div className="newsletter-box"><input placeholder="Enter your email" /><button className="primary-btn">Subscribe</button></div>
      </section>

      <footer className="footer">
        <div className="footer-columns">
          <div><h3>Fashion Hub</h3><p>A clothing-first shopping experience for modern wardrobes.</p></div>
          <div><h4>Quick Links</h4><p>About</p><p>Categories</p><p>New Arrivals</p></div>
          <div><h4>Support</h4><p>Contact Us</p><p>Returns</p><p>Shipping</p></div>
          <div><h4>Policies</h4><p>Privacy</p><p>Terms</p><p>FAQs</p></div>
        </div>
        <p className="copyright">© 2026 Fashion Hub. All rights reserved.</p>
      </footer>

      {quickViewItem ? <div className="modal-backdrop" onClick={() => setQuickViewItem(null)}><div className="modal-card" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setQuickViewItem(null)}><FaTimes /></button><img src={quickViewItem.image} alt={quickViewItem.name} onError={handleImageError} /><div className="modal-content"><p className="eyebrow">Quick view</p><h3>{quickViewItem.name}</h3><p>{quickViewItem.description}</p><div className="price-row"><span className="current-price">{formatPrice(quickViewItem.price)}</span><span className="original-price">{formatPrice(quickViewItem.originalPrice)}</span><span className="discount-badge">-{quickViewItem.discount}%</span></div><div className="meta-grid"><div><strong>Brand</strong><p>{quickViewItem.brand}</p></div><div><strong>Fabric</strong><p>{quickViewItem.fabric}</p></div><div><strong>Stock</strong><p>{quickViewItem.stock} left</p></div></div><div className="sizes-row">{quickViewItem.sizes.map((size) => <span key={`${quickViewItem.id}-${size}`}>{size}</span>)}</div><div className="card-actions modal-actions"><button className="primary-btn" onClick={() => addToCart(quickViewItem)}><FaShoppingCart /> Add to Cart</button><button className="secondary-btn" onClick={() => toggleWishlist(quickViewItem)}><FaHeart /> Wishlist</button></div></div></div></div> : null}
    </div>
  );
}

export default CostumesStore;

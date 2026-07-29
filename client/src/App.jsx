import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home";
import Stores from "./pages/Stores";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

import Movie from "./modules/Movie/Movie";
import Chocolate from "./modules/Chocolate/Chocolate";
import Food from "./modules/Food/Food";
import Bags from "./modules/Bags/Bags";
import Dress from "./modules/Dress/Dress";
import Shoes from "./modules/Shoes/Shoes";
import IceCream from "./modules/IceCream/IceCream";
import Cosmetics from "./modules/Cosmetics/Cosmetics";
import Fragrances from "./modules/Fragrances/Fragrances";
import Books from "./modules/Books/Books";
import Sports from "./modules/Sports/Sports";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        <Route path="/stores/movie" element={<Movie />} />
        <Route path="/stores/chocolate" element={<Chocolate />} />
        <Route path="/stores/food" element={<Food />} />
        <Route path="/stores/bags" element={<Bags />} />
        <Route path="/stores/dress" element={<Dress />} />
        <Route path="/stores/shoes" element={<Shoes />} />
        <Route path="/stores/ice-cream" element={<IceCream />} />
        <Route path="/stores/cosmetics" element={<Cosmetics />} />
        <Route path="/stores/fragrances" element={<Fragrances />} />
        <Route path="/stores/books" element={<Books />} />
        <Route path="/stores/sports" element={<Sports />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
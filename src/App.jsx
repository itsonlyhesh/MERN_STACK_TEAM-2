import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Deals from "./pages/Deals";
import Products from "./pages/Products";
import BrandsPage from "./pages/BrandsPage";
import Store from "./pages/Store";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        <Route path="/products" element={<Products />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/store" element={<Store />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/wishlist" element={<Wishlist/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
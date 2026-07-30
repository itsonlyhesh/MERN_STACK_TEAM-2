import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Global Context Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

// Layout
import Layout from './components/layout/Layout';

// Pages
import Home from './pages/Home';
import Categories from './pages/Categories';
import CategoryPage from './pages/CategoryPage';
import Programming from './pages/Programming';
import Novels from './pages/Novels';
import Academic from './pages/Academic';
import Children from './pages/Children';
import Featured from './pages/Featured';
import BookDetails from './pages/BookDetails';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

// CSS Design System Imports
import './css/main.css';
import './css/navbar.css';
import './css/footer.css';
import './css/home.css';
import './css/book.css';
import './css/cart.css';
import './css/admin.css';
import './css/auth.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/featured" element={<Featured />} />
                <Route path="/programming" element={<Programming />} />
                <Route path="/novels" element={<Novels />} />
                <Route path="/academic" element={<Academic />} />
                <Route path="/children" element={<Children />} />
                <Route path="/category/:slug" element={<CategoryPage />} />
                <Route path="/book/:id" element={<BookDetails />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

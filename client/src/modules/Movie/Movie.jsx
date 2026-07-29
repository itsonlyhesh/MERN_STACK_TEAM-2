import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Auth from "./pages/Auth";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import History from "./pages/History";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Movies from "./pages/Movies";
import SeatSelection from "./pages/SeatSelection";
import Snacks from "./pages/Snacks";
import Success from "./pages/Success";
import "./Movie.css";

function Movie() {
  return (
    <AuthProvider>
      <CartProvider>
        <main className="movie-module">
          <Routes>
            <Route index element={<Home />} />
            <Route path="movies" element={<Movies />} />
            <Route path="movie/:id" element={<MovieDetails />} />
            <Route path="seats" element={<SeatSelection />} />
            <Route path="snacks" element={<Snacks />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="booking-success" element={<Success />} />
            <Route path="my-bookings" element={<History />} />
            <Route path="auth" element={<Auth />} />
            <Route path="*" element={<Navigate to="/stores/movie" replace />} />
          </Routes>
        </main>
      </CartProvider>
    </AuthProvider>
  );
}

export default Movie;

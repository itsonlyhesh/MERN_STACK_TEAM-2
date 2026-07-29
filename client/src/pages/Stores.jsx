import { Link } from "react-router-dom";

const stores = [
  { name: "Movie Tickets", path: "/stores/movie" },
  { name: "Chocolate", path: "/stores/chocolate" },
  { name: "Fast Food", path: "/stores/food" },
  { name: "Bags", path: "/stores/bags" },
  { name: "Dress", path: "/stores/dress" },
  { name: "Shoes", path: "/stores/shoes" },
  { name: "Ice Cream", path: "/stores/ice-cream" },
  { name: "Cosmetics", path: "/stores/cosmetics" },
  { name: "Fragrances", path: "/stores/fragrances" },
  { name: "Books", path: "/stores/books" },
  { name: "Sports", path: "/stores/sports" },
];

function Stores() {
  return (
    <main className="page">
      <h1>All Stores</h1>

      <div className="simple-store-grid">
        {stores.map((store) => (
          <Link key={store.path} to={store.path}>
            {store.name}
          </Link>
        ))}
      </div>
    </main>
  );
}

export default Stores;
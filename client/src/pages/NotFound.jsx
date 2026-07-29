import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="page">
      <h1>404 - Page Not Found</h1>
      <Link to="/">Return Home</Link>
    </main>
  );
}

export default NotFound;
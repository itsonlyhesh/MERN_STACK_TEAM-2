import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  if (!category) return null;

  const routePath = category.slug ? `/${category.slug}` : `/categories?category=${encodeURIComponent(category.name)}`;

  return (
    <div
      className="category-card animate-fade-in"
      onClick={() => navigate(routePath)}
    >
      <div className="category-icon">{category.icon || '📚'}</div>
      <h3 className="category-name">{category.name}</h3>
      <p className="category-count">{category.bookCount || 10}+ Titles Available</p>
    </div>
  );
};

export default CategoryCard;

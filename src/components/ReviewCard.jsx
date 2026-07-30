const ReviewCard = ({ review }) => {
  if (!review) return null;

  return (
    <div className="review-card animate-fade-in">
      <div className="review-stars">
        {'★'.repeat(review.rating || 5)}{'☆'.repeat(5 - (review.rating || 5))}
      </div>
      <p className="review-text">"{review.comment}"</p>
      <div className="review-user">
        <div className="user-avatar">{review.avatar || review.name?.charAt(0) || 'U'}</div>
        <div>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '0.1rem' }}>{review.name}</h4>
          <span style={{ fontSize: '0.8rem', color: '#64748B' }}>{review.role || 'Verified Buyer'}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

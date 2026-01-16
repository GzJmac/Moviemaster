import React, { useState } from 'react';

const MovieCard = ({ 
  movie, 
  isLiked, 
  isInWatchlist, 
  userRating,
  onLike, 
  onWatchlist, 
  onRate,
  showRecommendation,
  recommendationReason,
  showAIExplanation,
  aiExplanation
}) => {
  const [hoveredStar, setHoveredStar] = useState(0);
  
  const handleStarClick = (rating) => {
    onRate(movie.id, rating);
  };
  
  const handleStarHover = (rating) => {
    setHoveredStar(rating);
  };
  
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= (hoveredStar || userRating);
      stars.push(
        <span
          key={i}
          className={`star ${isFilled ? 'filled' : ''}`}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleStarHover(i)}
          onMouseLeave={() => handleStarHover(0)}
        >
          ★
        </span>
      );
    }
    return stars;
  };
  
  return (
    <div className="movie-card">
      <div className="movie-poster">{movie.poster}</div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          <span>{movie.year}</span>
          <span>⭐ {movie.rating}</span>
        </div>
        <div className="movie-genres">
          {movie.genres.map((genre, index) => (
            <span key={index} className="genre-tag">{genre}</span>
          ))}
        </div>
        <div className="movie-actions">
          <button
            className={`action-btn like-btn ${isLiked ? 'liked' : ''}`}
            onClick={() => onLike(movie.id)}
          >
            {isLiked ? '❤️ Liked' : '🤍 Like'}
          </button>
          <button
            className={`action-btn watchlist-btn ${isInWatchlist ? 'in-watchlist' : ''}`}
            onClick={() => onWatchlist(movie.id)}
          >
            {isInWatchlist ? '✓ In List' : '+ Watchlist'}
          </button>
        </div>
        <div className="rating-section">
          <span className="rating-label">Your Rating:</span>
          <div className="rating-stars">
            {renderStars()}
          </div>
        </div>
        {showRecommendation && recommendationReason && (
          <div className="recommendation-reason">
            <p><strong>💡 Because you liked:</strong> {recommendationReason}</p>
          </div>
        )}
        {showAIExplanation && aiExplanation && (
          <div className="ai-explanation">
            <div className="ai-explanation-header">
              <span className="ai-icon">🤖</span>
              <span className="ai-label">AI Recommendation</span>
            </div>
            <p>{aiExplanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;

import React, { useState } from 'react';

const MovieCard = ({ 
  movie, 
  isLiked, 
  isInWatchlist,
  isWatched,
  userRating,
  userNote,
  onLike, 
  onWatchlist,
  onWatched,
  onRate,
  onNoteChange,
  showRecommendation,
  recommendationReason,
  showAIExplanation,
  aiExplanation
}) => {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [noteText, setNoteText] = useState(userNote?.text || '');
  
  const handleStarClick = (rating) => {
    onRate(movie.id, rating);
  };
  
  const handleStarHover = (rating) => {
    setHoveredStar(rating);
  };
  
  const handleNoteSave = () => {
    onNoteChange(movie.id, noteText);
    setShowNoteInput(false);
  };
  
  const handleNoteCancel = () => {
    setNoteText(userNote?.text || '');
    setShowNoteInput(false);
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
        <div className="watched-section">
          <button
            className={`watched-btn ${isWatched ? 'watched' : ''}`}
            onClick={() => onWatched(movie.id)}
            title={isWatched ? 'Mark as unwatched' : 'Mark as watched'}
          >
            {isWatched ? '✓ Already Watched' : '👁️ Mark as Watched'}
          </button>
        </div>
        <div className="rating-section">
          <span className="rating-label">Your Rating:</span>
          <div className="rating-stars">
            {renderStars()}
          </div>
        </div>
        
        <div className="notes-section">
          {!showNoteInput ? (
            <div className="notes-display">
              <button 
                className="add-note-btn"
                onClick={() => setShowNoteInput(true)}
              >
                {userNote ? '📝 Edit Note' : '📝 Add Note'}
              </button>
              {userNote && (
                <div className="note-content">
                  <p>{userNote.text}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="notes-input">
              <textarea
                className="note-textarea"
                placeholder="Add your notes... (e.g., 'seen many times, very funny' or 'stopped halfway through')"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={3}
                maxLength={500}
              />
              <div className="note-actions">
                <button className="note-save-btn" onClick={handleNoteSave}>
                  Save
                </button>
                <button className="note-cancel-btn" onClick={handleNoteCancel}>
                  Cancel
                </button>
              </div>
            </div>
          )}
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

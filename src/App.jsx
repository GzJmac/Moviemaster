import React, { useState, useEffect } from 'react';
import MovieCard from './components/MovieCard';
import { 
  MOVIES_DB, 
  VIBES, 
  getAllGenres,
  searchMovies,
  filterByVibe,
  filterByGenre,
  getRecommendations,
  findSimilarMovies,
  generateAIExplanation
} from './services/movieService';
import {
  getLikes,
  getRatings,
  getWatchlist,
  toggleLike,
  toggleWatchlist,
  setRating,
  getRating,
  isLiked,
  isInWatchlist
} from './utils/storage';

function App() {
  const [activeTab, setActiveTab] = useState('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVibe, setSelectedVibe] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [userLikes, setUserLikes] = useState([]);
  const [userRatings, setUserRatings] = useState({});
  const [watchlist, setWatchlist] = useState([]);
  
  // Load user data on mount
  useEffect(() => {
    setUserLikes(getLikes());
    setUserRatings(getRatings());
    setWatchlist(getWatchlist());
  }, []);
  
  // Handle like toggle
  const handleLike = (movieId) => {
    const newLikes = toggleLike(movieId);
    setUserLikes([...newLikes]);
  };
  
  // Handle watchlist toggle
  const handleWatchlist = (movieId) => {
    const newWatchlist = toggleWatchlist(movieId);
    setWatchlist([...newWatchlist]);
  };
  
  // Handle rating
  const handleRate = (movieId, rating) => {
    const newRatings = setRating(movieId, rating);
    setUserRatings({...newRatings});
  };
  
  // Get filtered movies based on current view
  const getFilteredMovies = () => {
    let movies = [...MOVIES_DB];
    
    // Apply search
    if (searchQuery) {
      movies = searchMovies(movies, searchQuery);
    }
    
    // Apply vibe filter
    if (selectedVibe) {
      movies = filterByVibe(movies, selectedVibe);
    }
    
    // Apply genre filter
    if (selectedGenre) {
      movies = filterByGenre(movies, selectedGenre);
    }
    
    // Tab-specific filtering
    if (activeTab === 'watchlist') {
      movies = movies.filter(m => watchlist.includes(m.id));
    } else if (activeTab === 'recommendations') {
      movies = getRecommendations(userLikes, userRatings, watchlist);
    } else if (activeTab === 'liked') {
      movies = movies.filter(m => userLikes.includes(m.id));
    }
    
    return movies;
  };
  
  // Get recommendation reason for a movie
  const getRecommendationReason = (movie) => {
    const similarMovies = findSimilarMovies(movie.id, 3);
    const likedSimilar = similarMovies.filter(m => userLikes.includes(m.id));
    
    if (likedSimilar.length > 0) {
      return likedSimilar[0].title;
    }
    
    // Find by genre
    const likedWithCommonGenre = MOVIES_DB.filter(m => 
      userLikes.includes(m.id) && 
      m.genres.some(g => movie.genres.includes(g))
    );
    
    if (likedWithCommonGenre.length > 0) {
      return likedWithCommonGenre[0].title;
    }
    
    // Find by vibe
    const likedWithSameVibe = MOVIES_DB.filter(m => 
      userLikes.includes(m.id) && m.vibe === movie.vibe
    );
    
    if (likedWithSameVibe.length > 0) {
      return likedWithSameVibe[0].title;
    }
    
    return null;
  };
  
  const filteredMovies = getFilteredMovies();
  const genres = getAllGenres();
  
  return (
    <div className="app">
      <header className="header">
        <h1>🎬 Movie Master</h1>
        <p>AI-powered movie recommendations tailored to your taste</p>
      </header>
      
      <div className="container">
        {/* Tab Navigation */}
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === 'discover' ? 'active' : ''}`}
            onClick={() => setActiveTab('discover')}
          >
            🔍 Discover
          </button>
          <button
            className={`tab-button ${activeTab === 'recommendations' ? 'active' : ''}`}
            onClick={() => setActiveTab('recommendations')}
          >
            ✨ For You
          </button>
          <button
            className={`tab-button ${activeTab === 'watchlist' ? 'active' : ''}`}
            onClick={() => setActiveTab('watchlist')}
          >
            📋 Watchlist ({watchlist.length})
          </button>
          <button
            className={`tab-button ${activeTab === 'liked' ? 'active' : ''}`}
            onClick={() => setActiveTab('liked')}
          >
            ❤️ Liked ({userLikes.length})
          </button>
        </div>
        
        {/* Search and Filters */}
        <div className="search-section">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Vibe Filters */}
          <div className="vibe-filters">
            <button
              className={`vibe-filter ${selectedVibe === '' ? 'active' : ''}`}
              onClick={() => setSelectedVibe('')}
            >
              All Vibes
            </button>
            {VIBES.map(vibe => (
              <button
                key={vibe.id}
                className={`vibe-filter ${selectedVibe === vibe.id ? 'active' : ''}`}
                onClick={() => setSelectedVibe(vibe.id)}
                title={vibe.description}
              >
                {vibe.label}
              </button>
            ))}
          </div>
          
          {/* Genre Filters */}
          <div className="genre-filters">
            <button
              className={`genre-filter ${selectedGenre === '' ? 'active' : ''}`}
              onClick={() => setSelectedGenre('')}
            >
              All Genres
            </button>
            {genres.map(genre => (
              <button
                key={genre}
                className={`genre-filter ${selectedGenre === genre ? 'active' : ''}`}
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
        
        {/* Movies Grid */}
        {filteredMovies.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🎥</div>
            <h3>No movies found</h3>
            <p>
              {activeTab === 'watchlist' && 'Your watchlist is empty. Add some movies!'}
              {activeTab === 'liked' && 'You haven\'t liked any movies yet. Start exploring!'}
              {activeTab === 'recommendations' && 'Like or rate some movies to get personalized recommendations!'}
              {activeTab === 'discover' && 'Try adjusting your search or filters.'}
            </p>
          </div>
        ) : (
          <div className="movies-grid">
            {filteredMovies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isLiked={isLiked(movie.id)}
                isInWatchlist={isInWatchlist(movie.id)}
                userRating={getRating(movie.id)}
                onLike={handleLike}
                onWatchlist={handleWatchlist}
                onRate={handleRate}
                showRecommendation={activeTab === 'recommendations' && (userLikes.length > 0 || Object.keys(userRatings).length > 0)}
                recommendationReason={getRecommendationReason(movie)}
                showAIExplanation={activeTab === 'recommendations' && (userLikes.length > 0 || Object.keys(userRatings).length > 0)}
                aiExplanation={generateAIExplanation(movie, userLikes, userRatings)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

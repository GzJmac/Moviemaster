import React, { useState, useEffect } from 'react';
import MovieCard from './components/MovieCard';
import LoginModal from './components/LoginModal';
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
  getWatchedMovies,
  toggleLike,
  toggleWatchlist,
  toggleWatchedMovie,
  setRating,
  getRating,
  isLiked,
  isInWatchlist,
  isWatched,
  saveLikes,
  saveRatings,
  saveWatchlist,
  saveWatchedMovies
} from './utils/storage';
import {
  signInWithGoogle,
  signInWithEmail,
  signUpWithEmail,
  logout,
  onAuthChange,
  saveUserData,
  getUserData
} from './services/authService';

function App() {
  const [activeTab, setActiveTab] = useState('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVibe, setSelectedVibe] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [userLikes, setUserLikes] = useState([]);
  const [userRatings, setUserRatings] = useState({});
  const [watchlist, setWatchlist] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isGuest, setIsGuest] = useState(true);
  
  // Load user data on mount
  useEffect(() => {
    // Check for authentication state
    const unsubscribe = onAuthChange(async (authUser) => {
      if (authUser) {
        setUser(authUser);
        setIsGuest(false);
        // Load user data from cloud
        const { data } = await getUserData(authUser.uid);
        if (data) {
          setUserLikes(data.likes || []);
          setUserRatings(data.ratings || {});
          setWatchlist(data.watchlist || []);
          setWatchedMovies(data.watchedMovies || []);
          
          // Sync to local storage
          saveLikes(data.likes || []);
          saveRatings(data.ratings || {});
          saveWatchlist(data.watchlist || []);
          saveWatchedMovies(data.watchedMovies || []);
        }
      } else {
        setUser(null);
        setIsGuest(true);
        // Load from local storage for guest users
        setUserLikes(getLikes());
        setUserRatings(getRatings());
        setWatchlist(getWatchlist());
        setWatchedMovies(getWatchedMovies());
      }
    });
    
    return () => unsubscribe();
  }, []);
  
  // Sync user data to cloud when it changes
  useEffect(() => {
    if (user && !isGuest) {
      saveUserData(user.uid, {
        likes: userLikes,
        ratings: userRatings,
        watchlist: watchlist,
        watchedMovies: watchedMovies,
        lastUpdated: new Date().toISOString()
      });
    }
  }, [user, userLikes, userRatings, watchlist, watchedMovies, isGuest]);
  
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
  
  // Handle watched toggle
  const handleWatched = (movieId) => {
    const newWatched = toggleWatchedMovie(movieId);
    setWatchedMovies([...newWatched]);
  };
  
  // Handle rating
  const handleRate = (movieId, rating) => {
    const newRatings = setRating(movieId, rating);
    setUserRatings({...newRatings});
  };
  
  // Handle sign in
  const handleSignIn = async (email, password, isSignUp, isGoogle = false) => {
    if (isGoogle) {
      const result = await signInWithGoogle();
      return result;
    } else if (isSignUp) {
      const result = await signUpWithEmail(email, password);
      return result;
    } else {
      const result = await signInWithEmail(email, password);
      return result;
    }
  };
  
  // Handle sign out
  const handleSignOut = async () => {
    await logout();
    setUser(null);
    setIsGuest(true);
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
      movies = getRecommendations(userLikes, userRatings, watchlist, watchedMovies);
    } else if (activeTab === 'liked') {
      movies = movies.filter(m => userLikes.includes(m.id));
    } else if (activeTab === 'watched') {
      movies = movies.filter(m => watchedMovies.includes(m.id));
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
        <div className="auth-section">
          {user && !isGuest ? (
            <div className="user-info">
              <span className="user-email">{user.email}</span>
              <button onClick={handleSignOut} className="signout-btn">Sign Out</button>
            </div>
          ) : (
            <button onClick={() => setShowLoginModal(true)} className="signin-btn">
              Sign In
            </button>
          )}
        </div>
      </header>
      
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSignIn={handleSignIn}
        />
      )}
      
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
            ✨ For You (Top 50)
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
          <button
            className={`tab-button ${activeTab === 'watched' ? 'active' : ''}`}
            onClick={() => setActiveTab('watched')}
          >
            ✓ Watched ({watchedMovies.length})
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
              {activeTab === 'watched' && 'You haven\'t marked any movies as watched yet.'}
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
                isWatched={isWatched(movie.id)}
                userRating={getRating(movie.id)}
                onLike={handleLike}
                onWatchlist={handleWatchlist}
                onWatched={handleWatched}
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

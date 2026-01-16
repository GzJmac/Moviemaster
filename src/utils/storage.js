// Local storage utility for persisting user data
const STORAGE_KEYS = {
  LIKES: 'moviemaster_likes',
  RATINGS: 'moviemaster_ratings',
  WATCHLIST: 'moviemaster_watchlist',
  WATCH_HISTORY: 'moviemaster_watch_history'
};

// Get data from localStorage
const getFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage: ${error}`);
    return defaultValue;
  }
};

// Save data to localStorage
const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage: ${error}`);
    return false;
  }
};

// User Likes
export const getLikes = () => {
  return getFromStorage(STORAGE_KEYS.LIKES, []);
};

export const saveLikes = (likes) => {
  return saveToStorage(STORAGE_KEYS.LIKES, likes);
};

export const toggleLike = (movieId) => {
  const likes = getLikes();
  const index = likes.indexOf(movieId);
  
  if (index > -1) {
    likes.splice(index, 1);
  } else {
    likes.push(movieId);
  }
  
  saveLikes(likes);
  return likes;
};

export const isLiked = (movieId) => {
  const likes = getLikes();
  return likes.includes(movieId);
};

// User Ratings
export const getRatings = () => {
  return getFromStorage(STORAGE_KEYS.RATINGS, {});
};

export const saveRatings = (ratings) => {
  return saveToStorage(STORAGE_KEYS.RATINGS, ratings);
};

export const setRating = (movieId, rating) => {
  const ratings = getRatings();
  ratings[movieId] = rating;
  saveRatings(ratings);
  return ratings;
};

export const getRating = (movieId) => {
  const ratings = getRatings();
  return ratings[movieId] || 0;
};

// Watchlist
export const getWatchlist = () => {
  return getFromStorage(STORAGE_KEYS.WATCHLIST, []);
};

export const saveWatchlist = (watchlist) => {
  return saveToStorage(STORAGE_KEYS.WATCHLIST, watchlist);
};

export const toggleWatchlist = (movieId) => {
  const watchlist = getWatchlist();
  const index = watchlist.indexOf(movieId);
  
  if (index > -1) {
    watchlist.splice(index, 1);
  } else {
    watchlist.push(movieId);
  }
  
  saveWatchlist(watchlist);
  return watchlist;
};

export const isInWatchlist = (movieId) => {
  const watchlist = getWatchlist();
  return watchlist.includes(movieId);
};

// Watch History
export const getWatchHistory = () => {
  return getFromStorage(STORAGE_KEYS.WATCH_HISTORY, []);
};

export const saveWatchHistory = (history) => {
  return saveToStorage(STORAGE_KEYS.WATCH_HISTORY, history);
};

export const addToWatchHistory = (movieId) => {
  const history = getWatchHistory();
  
  // Remove if already exists (to move to front)
  const index = history.indexOf(movieId);
  if (index > -1) {
    history.splice(index, 1);
  }
  
  // Add to front of history
  history.unshift(movieId);
  
  // Keep only last 50 items
  if (history.length > 50) {
    history.length = 50;
  }
  
  saveWatchHistory(history);
  return history;
};

export const isInWatchHistory = (movieId) => {
  const history = getWatchHistory();
  return history.includes(movieId);
};

// Clear all data
export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};

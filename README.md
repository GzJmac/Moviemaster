# Movie Master 🎬

An AI-powered movie recommendation web app that learns your taste from likes, ratings, and watch history, then recommends movies you'll enjoy. Pick a vibe or genre first (like "chill comedy", "dark thriller", or "feel-good romance") and get filtered, ranked suggestions that match your mood.

## ✨ Features

- **User Authentication**: Sign in with Google OAuth or email/password to sync preferences across devices
- **Personalized Recommendations**: AI-powered top 50 suggestions based on your likes, ratings, and watch history
- **Watched Movies Tracking**: Mark movies as watched to exclude them from recommendations
- **Movie Notes**: Add personal notes to any movie (e.g., "seen 100x, good" or "stopped halfway through")
- **AI Profile Building**: Enhanced recommendations based on your notes and viewing patterns
- **Vibe Filtering**: Choose your mood - chill comedy (Sandler-ish), dark thriller, romantic, uplifting, and more
- **Genre Filters**: Browse by specific genres (Action, Drama, Comedy, Sci-Fi, etc.)
- **Smart Search**: Find movies by title, description, or genre
- **Watchlist**: Save movies to watch later
- **Rating System**: Rate movies 1-5 stars to improve recommendations
- **"Because you liked..."**: See why each movie is recommended based on your taste
- **AI Explanations**: Get detailed explanations for why movies match your preferences (enhanced with notes analysis)
- **Cloud Sync**: Signed-in users get their preferences synced via Firebase
- **Guest Mode**: Use without signing in with local storage only

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/GzJmac/Moviemaster.git
cd Moviemaster
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase (optional - required for authentication):
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication > Sign-in methods: Email/Password and Google
   - Enable Firestore Database
   - Copy your Firebase configuration
   - Create a `.env` file from `.env.example`:
     ```bash
     cp .env.example .env
     ```
   - Add your Firebase credentials to `.env`

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## 🛠️ Built With

- **React 19** - Frontend framework
- **Vite** - Build tool and dev server
- **Firebase** - Authentication and cloud storage
- **Firestore** - User data persistence
- **Local Storage** - Offline/guest mode storage

## 📖 How to Use

1. **Sign In (Optional)**: Click "Sign In" to authenticate with Google or email/password for cloud sync
2. **Discover Movies**: Browse the full collection on the Discover tab
3. **Search & Filter**: Use search and filter by vibe or genre to find specific movies
4. **Mark as Watched**: Click "Mark as Watched" on movies you've already seen
5. **Like Movies**: Click the heart button on movies you enjoy
6. **Rate Movies**: Give movies 1-5 stars to refine recommendations
7. **Add to Watchlist**: Save movies you want to watch later
8. **Get Recommendations**: Visit the "For You" tab to see top 50 personalized picks (excludes watched movies)
9. **View AI Explanations**: See detailed reasons why each movie is recommended
10. **Guest Mode**: Use without signing in - all data stored locally

## 🎭 Available Vibes

- **Chill Comedy** - Relaxed, fun comedies (Sandler-ish)
- **Dark Thriller** - Intense, psychological thrillers
- **Feel-Good Romance** - Heartwarming love stories
- **Uplifting** - Inspiring and hopeful films
- **Mind-Bending** - Complex, thought-provoking movies
- **Epic** - Grand, large-scale adventures
- **Edgy** - Gritty and unconventional films
- **Fun** - Pure entertainment

## 🧠 How the AI Works

The recommendation engine:
1. Analyzes your liked movies and ratings
2. Identifies patterns in genres, vibes, and themes
3. Calculates similarity scores for unwatched movies
4. Ranks suggestions based on your unique taste profile
5. Provides explanations for each recommendation

## 📦 Project Structure

```
Moviemaster/
├── src/
│   ├── components/      # React components
│   │   └── MovieCard.jsx
│   ├── services/        # Business logic
│   │   └── movieService.js
│   ├── utils/           # Utility functions
│   │   └── storage.js
│   ├── styles/          # CSS styles
│   │   └── index.css
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── index.html
├── vite.config.js
└── package.json
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Movie data curated for demonstration purposes
- AI explanations powered by algorithmic pattern matching
- Built with ❤️ for movie lovers
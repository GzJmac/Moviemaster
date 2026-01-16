# Movie Master 🎬

An AI-powered movie recommendation web app that learns your taste from likes, ratings, and watch history, then recommends movies you'll enjoy. Pick a vibe or genre first (like "chill comedy", "dark thriller", or "feel-good romance") and get filtered, ranked suggestions that match your mood.

## ✨ Features

- **Personalized Recommendations**: AI-powered suggestions based on your likes, ratings, and preferences
- **Vibe Filtering**: Choose your mood - chill comedy, dark thriller, romantic, uplifting, and more
- **Genre Filters**: Browse by specific genres (Action, Drama, Comedy, Sci-Fi, etc.)
- **Smart Search**: Find movies by title, description, or genre
- **Watchlist**: Save movies to watch later
- **Rating System**: Rate movies 1-5 stars to improve recommendations
- **"Because you liked..."**: See why each movie is recommended based on your taste
- **AI Explanations**: Get detailed explanations for why movies match your preferences
- **Persistent Storage**: Your preferences are saved locally in your browser

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

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 🛠️ Built With

- **React** - Frontend framework
- **Vite** - Build tool and dev server
- **Local Storage** - Client-side data persistence

## 📖 How to Use

1. **Discover Movies**: Browse the full collection on the Discover tab
2. **Search & Filter**: Use the search bar and filter by vibe or genre
3. **Like Movies**: Click the heart button on movies you enjoy
4. **Rate Movies**: Give movies 1-5 stars to refine recommendations
5. **Add to Watchlist**: Save movies to watch later
6. **Get Recommendations**: Visit the "For You" tab to see personalized suggestions
7. **View AI Explanations**: See why each movie is recommended based on your taste

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
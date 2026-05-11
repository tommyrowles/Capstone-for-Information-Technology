import React, { useState } from "react";
import axios from "axios";

function Movies() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  const API_KEY = "7a0738c8ba1148c1f8d6fce6a5a43d6c";

  const searchMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`
      );

      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <div className="container">
      <h1>Movie Search</h1>

      <div className="movie-search">
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={searchMovies}>Search</button>
      </div>

      <div className="movie-grid">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
            )}

            <h3>{movie.title}</h3>
            <p>⭐ {movie.vote_average}</p>
            <p>{movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;
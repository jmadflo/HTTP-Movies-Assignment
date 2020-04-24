import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  return (
    <div className="movie-list">
      {/* link to add movie url */}
      <Link to="/add-movie">
        <div className="addMovieContainer">
          <div className='addMovie'>+</div>
        </div>
      </Link>
      {
        movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))
      }
    </div>
  );
}

export default MovieList;

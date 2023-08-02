// import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { fetchMovies } from 'api';
import React, { useState, useEffect } from 'react';

export const Movies = () => {
  const [movies, setMovies] = useState([]);

console.log(movies);

  useEffect(() => {
    fetchMovies()
      .then(data => {
        setMovies(data.results);
      })
      .catch(error => {
        console.log('An error occurred', error);
      });
  }, []);

  return (
    <div>
      <input type="text" value="" onChange={() => {}} />
      {/* <div className="wrapper">
        <div>
          Movies
          {movies.map(movie => (
            <div key={movie.id}>
              <img src={movie.poster_path} alt="movie poster" />
              {movie.title}
              <Link to={`${movie.id}`}>See details</Link>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

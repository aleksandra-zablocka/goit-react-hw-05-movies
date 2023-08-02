import React, { useState, useEffect } from 'react';
import { fetchMovies } from 'api';
import css from './Home.module.css';

export const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies()
      .then(data => {
        setMovies(data.results);
      })
      .catch(error => {
        console.log('An error occurred', error);
      });
  }, []);

  const imageUrlBase = 'https://image.tmdb.org/t/p/';
  const imageSize = 'w500';
  const moviesWithTitles = movies.filter(movie => movie.title !== undefined);
  // const moviesWithTitles = movies.filter((movie) => {
  //   console.log('Movie title:', movie.title);
  //   return movie.title !== '';});

  const handleCardClick = movieId => {
    // Przekierowanie na stronę filmu po kliknięciu karty
    window.location.href = `/movies/${movieId}`;
  };

  return (
    <div>
      <div className={css.trending}>Trending today</div>
      <div className={css.wrapper}>
        {moviesWithTitles.map(movie => (
          <div
            key={movie.id}
            className={css['movie-card']}
            onClick={() => handleCardClick(movie.id)}
          >
            <img
              src={imageUrlBase + imageSize + movie.poster_path}
              alt="movie poster"
            />
            <div className={css['movie-title']}>{movie.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

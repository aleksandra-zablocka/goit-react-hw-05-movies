import React, { useState, useEffect } from 'react';
import { fetchMovies } from 'api';
import css from './Home.module.css';
import { Link } from 'react-router-dom';

const Home = () => {
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

  return (
    <div>
      <div className={css.trending}>Trending today</div>
      <div className={css.wrapper}>
      {moviesWithTitles.map(movie => (
          <Link to={`/movies/${movie.id}`} key={movie.id} className={css['movie-card']}>
            <img
              src={imageUrlBase + imageSize + movie.poster_path}
              alt="movie poster"
            />
            <div className={css['movie-title']}>{movie.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
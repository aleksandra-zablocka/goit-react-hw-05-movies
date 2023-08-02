import { useSearchParams, Link } from 'react-router-dom';
import { fetchMovies } from 'api';
import React, { useState, useEffect } from 'react';
import css from './Movies.module.css';

export const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const title = searchParams.get('title') || ''; 
    setSearchQuery(title);
  }, [searchParams]);

  useEffect(() => {
    fetchMovies(searchQuery)
      .then(data => {
        setMovies(data.results);
      })
      .catch(error => {
        console.log('An error occurred', error);
      });
  }, [searchQuery]);

  const handleInput = title => {
    setSearchQuery(title);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const params = searchQuery !== '' ? { title: searchQuery } : {};
    setSearchParams(params);
  };

  const imageUrlBase = 'https://image.tmdb.org/t/p/';
  const imageSize = 'w500';

  return (
    <div className={css.movieSearch}>
      <form onSubmit={handleSubmit}>
        <input
          className={css.inputSearch}
          type="text"
          value={searchQuery}
          onChange={e => handleInput(e.target.value)}
          placeholder="Search movies"
        />
        <button type="submit">Search</button>
      </form>
      <div className={css.results}>Results</div>
      <div className={css.wrapper}>
        {movies.map(movie => (
          <Link
            to={`/movies/${movie.id}`}
            key={movie.id}
            className={css['movie-card']}
          >
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

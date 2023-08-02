import React, { useState, useEffect } from 'react';
import { fetchMovieDetails } from 'api';
import { useParams, Link, Outlet } from 'react-router-dom';
import css from './MovieDetails.module.css';

export const MovieDetails = () => {
  const { movieId } = useParams(); // Pobieramy identyfikator filmu z URL-u
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails(movieId) // Przekazujemy identyfikator filmu do funkcji fetchMovieDetails
      .then(data => {
        setMovie(data);
      })
      .catch(error => {
        console.log('An error occurred', error);
      });
  }, [movieId]); // Dodajemy movieId do zależności, aby reagować na jego zmianę

  if (!movie) {
    return <div>Loading...</div>;
  }

  const imageUrlBase = 'https://image.tmdb.org/t/p/';
  const imageSize = 'w300';

  return (
    <div>
      <div className={css.wrapper}>
        <div>
          <img
            src={imageUrlBase + imageSize + movie.poster_path}
            alt="movie poster"
          />
        </div>
        <div className={css.info}>
          <h1>{movie.title}</h1>
          <p>Rating: {movie.vote_average}</p>
          {/* <p>User Score: {Math.round(movie.vote_average * 10)}%</p> */}
          <h3 style={{ margin: '0 0 10px 0' }}>Overview:</h3>
          <p> {movie.overview}</p>
          <h3 style={{ margin: '0 0 10px 0' }}>Genres:</h3>
          <div className={css.genres}>
            {movie.genres.map(genre => {
              return (
                <p className={css.genre} key={genre.id}>
                  {genre.name}
                </p>
              );
            })}
          </div>
        </div>
      </div>
      <div className={css.additionalInformation}>
        <h4 style={{ margin: '0 0 10px 0' }}>Additional information</h4>
        <Link to="cast">Cast</Link>
        <Link to="reviews">Reviews</Link>
      </div>
      <Outlet />
    </div>
  );
};

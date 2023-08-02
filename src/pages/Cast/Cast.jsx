import React, { useState, useEffect } from 'react';
import { fetchCast } from 'api';
import { useParams } from 'react-router-dom';
import css from './Cast.module.css';

export const Cast = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchCast(movieId)
      .then(data => {
        setMovie(data.movie);
        setCast(data.cast);
      })
      .catch(error => {
        console.log('An error occurred', error);
      });
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const imageUrlBase = 'https://image.tmdb.org/t/p/';
  const imageSize = 'w200';
  const actorWithPhotos = cast.filter(actor => actor.profile_path !== null)
  console.log('Lista aktorów:', cast);

  return (
    <div className={css.wrapper}>
      <h3>Cast:</h3>
      <div className={css.cast}>
        {actorWithPhotos.map(actor => (
          <div key={actor.id} className={css.castCard}>
            <img
              src={imageUrlBase + imageSize + actor.profile_path}
              alt="actor"
              className={css.castPoster}
            />
            <p>Name: {actor.name}</p>
            <p>Character: {actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

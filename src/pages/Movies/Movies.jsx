import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { fetchMovies } from 'api';
import React, { useState, useEffect } from 'react';
import css from './Movies.module.css';

export const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetchMovies()
      .then(data => {
        setMovies(data.results);
      })
      .catch(error => {
        console.log('An error occurred', error);
      });
  }, []);

  const handleInput = title => {
    const params = title !== '' ? { title } : {};
    setSearchParams(params);
  };

  const imageUrlBase = 'https://image.tmdb.org/t/p/';
  const imageSize = 'w500';
  // const moviesWithTitles = movies.filter(movie => movie.title !== undefined);

  return (
    <div className={css.movieSearch}>
      {/* <input className={css.inputSearch} type="text" value="" onChange={() => {}} placeholder="Search movies"/> */}
      <input
        className={css.inputSearch}
        type="text"
        value=""
        onChange={e => handleInput(e.target.value)}
        placeholder="Search movies"
      />
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

// import { useSearchParams, Link, useLocation } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';
// import { fetchMovies } from 'api';
// import css from './Movies.module.css';

// export const Movies = () => {
//   const [movies, setMovies] = useState([]);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const movieTitle = searchParams.get('title') ?? ""

//   useEffect(() => {
//     fetchMovies()
//       .then(data => {
//         setMovies(data.results);
//       })
//       .catch(error => {
//         console.log('An error occurred', error);
//       });
//   }, []);

//   const imageUrlBase = 'https://image.tmdb.org/t/p/';
//   const imageSize = 'w500';

// const handleInput = (title) => {
//   const params = title !== "" ? {title} : {}
//   setSearchParams(params)
// }

// const filteredMovies = movies.filter((movie) => {
//   const movieTitleLowerCase = movieTitle.toLowerCase();
//   return movie.title.toLowerCase().includes(movieTitleLowerCase)
// })

//   return (
//     <div className={css.movieSearch}>
//       <input className={css.inputSearch} type="text" value="" onChange={(e) => handleInput(e.target.value)} placeholder="Search movies"/>
//       <div className={css.results}>Results</div>
//       <div className={css.wrapper}>
//         {filteredMovies.map(movie => (
//           <Link to={`/movies/${movie.id}`} key={movie.id} className={css['movie-card']}>
//             <img
//               src={imageUrlBase + imageSize + movie.poster_path}
//               alt="movie poster"
//             />
//             <div className={css['movie-title']}>{movie.title}</div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

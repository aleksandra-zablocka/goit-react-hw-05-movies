// const API_KEY = 'a803ac3d2a57bd184847aa6123688c2b'
// https://api.themoviedb.org/3/trending/all/day?api_key=a803ac3d2a57bd184847aa6123688c2b
const API_KEY_CODE =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODAzYWMzZDJhNTdiZDE4NDg0N2FhNjEyMzY4OGMyYiIsInN1YiI6IjY0YzZiY2JjNjNlNmZiMDBjNDA5ODk4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b4_b4v2aFt1MJPqiC2-ZpicuVjibXdang7REL2t1nu8';

export const fetchMovies = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY_CODE}`,
    },
  };

  try {
    const response = await fetch(
      'https://api.themoviedb.org/3/trending/all/day',
      options
    );

    if (!response.ok) {
      throw new Error('Network response failed');
    }

    const data = await response.json();
    // const movies = data.results;
    // console.log(movies);
    return data;
  } catch (error) {
    console.log('An error occurred', error);
    return error;
  }
};


export const fetchMovieDetails = async (movieId) => {
  const API_KEY_CODE =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODAzYWMzZDJhNTdiZDE4NDg0N2FhNjEyMzY4OGMyYiIsInN1YiI6IjY0YzZiY2JjNjNlNmZiMDBjNDA5ODk4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b4_b4v2aFt1MJPqiC2-ZpicuVjibXdang7REL2t1nu8';

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY_CODE}`,
    },
  };
  
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options); // Przekazujemy identyfikator filmu w URL

    if (!response.ok) {
      throw new Error('Network response failed');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.log('An error occurred', error);
    return error;
  }
};
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

export const fetchMovieDetails = async movieId => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY_CODE}`,
    },
  };

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      options
    ); // Przekazujemy identyfikator filmu w URL

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

export const fetchCast = async movieId => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY_CODE}`,
    },
  };

  try {
    const [movieResponse, castResponse] = await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        options
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
        options
      ),
    ]);

    if (!movieResponse.ok || !castResponse.ok) {
      throw new Error('Network response failed');
    }

    const movieData = await movieResponse.json();
    const castData = await castResponse.json();

    return { movie: movieData, cast: castData.cast };
  } catch (error) {
    console.log('An error occurred', error);
    return error;
  }
};

export const fetchReviews = async movieId => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY_CODE}`,
    },
  };

  try {
    const [movieResponse, reviewResponse] = await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        options
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US`,
        options
      ),
    ]);

    if (!movieResponse.ok || !reviewResponse.ok) {
      throw new Error('Network response failed');
    }

    const movieData = await movieResponse.json();
    const reviewData = await reviewResponse.json();

    return { movie: movieData, review: reviewData.results };
  } catch (error) {
    console.log('An error occurred', error);
    return error;
  }
};

export const fetchSearch = async (query) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY_CODE}`,
    },
  };

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY_CODE}&query=${query}`,
      options
    );

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
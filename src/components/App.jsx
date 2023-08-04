import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navigation } from './Navigation';
// import { Home } from 'pages/Home/Home';
// import { Movies } from 'pages/Movies/Movies';
// import { MovieDetails } from 'pages/MovieDetails/MovieDetails';
// import { Cast } from 'pages/Cast/Cast';
// import { Reviews } from 'pages/Reviews/Reviews';
// import { NotFound } from 'pages/NotFound/NotFound';

const Home = lazy(() => import('pages/Home/Home'));
const Movies = lazy(() => import('pages/Movies/Movies'));
const MovieDetails = lazy(() => import('pages/MovieDetails/MovieDetails'));
const Cast = lazy(() => import('pages/Cast/Cast'));
const Reviews = lazy(() => import('pages/Reviews/Reviews'));
const NotFound = lazy(() => import('pages/NotFound/NotFound'));

export const App = () => {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
};

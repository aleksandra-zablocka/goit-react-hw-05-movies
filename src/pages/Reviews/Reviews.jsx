import React, { useState, useEffect } from 'react';
import { fetchReviews } from 'api';
import { useParams } from 'react-router-dom';
import css from './Reviews.module.css';

const Reviews = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [review, setReview] = useState([]);

  useEffect(() => {
    fetchReviews(movieId)
      .then(data => {
        setMovie(data.movie);
        setReview(data.review);
      })
      .catch(error => {
        console.log('An error occurred', error);
      });
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  if (review.length === 0) {
    return <div style={{ marginLeft: '20px' }}>There are no reviews</div>;
  }

  return (
    <div className={css.wrapper}>
      <h3>Reviews:</h3>
      <div className={css.reviews}>
        {review.map(review => (
          <div key={review.id} className={css.review}>
            <h4 className={css.reviewTitle}>Review: {review.author}</h4>
            <p className={css.review}>{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
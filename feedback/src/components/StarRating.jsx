import React from 'react';
import './StarRating.css'

const StarRating = ({ value, onChange }) => {
  const stars = [1, 2, 3, 4, 5];

  console.log(value)

  return (
    <div className="star-rating">
      {stars.map((star) => (
        <span
          key={star}
          className={`star ${star <= value ? 'selected' : ''}`}
          onClick={() => onChange(star)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;

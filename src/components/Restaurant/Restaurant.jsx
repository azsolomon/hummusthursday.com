import React from 'react';
import './Restaurant.css';

const Restaurant = result => (
  <div className="restaurant-container" key={result.id}>
    <div className="restaurant-row">
      <div className="restleft-container">
        {result.name}
      </div>
      <div className="restright-container">
        {result.vicinity}
      </div>
    </div>
    <div className="restaurant-row">
      <div className="restleft-container">
        {'€'.repeat(result.price_level)}
        {' '}
        |
        {' '}
        {result.rating}
        {' '}
        <span role="img" aria-label="search">⭐️</span>
        {' '}
        |
        {' '}
        {result.user_ratings_total}
        {' '}
        Reviews
      </div>
      <div className="restright-container">
        <a
          style={{ color: 'black' }}
          href={`https://www.google.com/maps/place/?q=place_id:${result.place_id}`}
        >
          View in Maps
        </a>
      </div>
    </div>
  </div>
);

export default Restaurant;

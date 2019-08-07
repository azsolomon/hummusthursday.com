import React, { useState } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import moment from 'moment';
import Script from 'react-load-script';
import Restaurant from './components/Restaurant/Restaurant';
import ListLoader from './components/ListLoader/ListLoader';
import './App.css';
import { GOOGLE_API_KEY } from './secrets';

/* global google */

function App() {
  const { width, height } = useWindowSize();
  const weekday = moment().day();

  const [searchService, updateSearchService] = useState(null);
  const [results, updateResults] = useState(null);
  const [address, updateAddress] = useState('');
  const [confetti, updateConfetti] = useState(false);

  const handleScriptLoad = () => {
    const center = new google.maps.LatLng(0, 0);
    const map = new google.maps.Map(document.getElementById('map'), { center, zoom: 1 });
    const service = new google.maps.places.PlacesService(map);
    updateSearchService(service);
  };

  const findHummus = (latitude, longitude) => {
    const location = new google.maps.LatLng(latitude, longitude);
    searchService.nearbySearch(
      {
        location,
        radius: '500000',
        type: ['restaurant'],
        keyword: 'hummus',
      },
      response => updateResults(response),
    );
  };

  const handleSearch = () => {
    updateConfetti(true);
    navigator.geolocation.getCurrentPosition(
      position => findHummus(position.coords.latitude, position.coords.longitude),
      err => console.warn(err),
    );
  };

  const handleAddress = () => {
    updateConfetti(true);
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address }, result => findHummus(
      result[0].geometry.viewport.na.j,
      result[0].geometry.viewport.ga.j,
    ));
  };

  return (
    <div className={confetti ? 'app' : 'app-initial'}>
      <div id="map" />
      <div className={confetti ? 'app-header' : 'app-header-initial'}>
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`}
          onLoad={handleScriptLoad}
        />
        {confetti && (
          <Confetti
            width={width}
            height={2 * height}
            style={{ pointerEvents: 'none' }}
          />
        )}
        <div>
          {weekday === 4 ? 'Happy Hummus Thursday!' : 'Prepare for Hummus Thursday!'}
        </div>
        <div className="button-row">
          <div className="address-container">
            <button
              className="location-button"
              type="submit"
              onClick={() => handleSearch()}
              disabled={!searchService}
            >
              Near Me
            </button>
            <input
              className="address-input"
              type="text"
              placeholder="Enter an Address"
              value={address}
              onChange={e => updateAddress(e.target.value)}
            />
            <button
              className="address-button"
              type="submit"
              onClick={() => handleAddress()}
            >
              <span role="img" aria-label="search">🔍</span>
            </button>
          </div>
        </div>
      </div>
      {(confetti && !results) && <ListLoader />}
      {results && (
      <div className="hummus-container">
        {results.map(result => Restaurant(result))}
      </div>
      )}
    </div>
  );
}

export default App;

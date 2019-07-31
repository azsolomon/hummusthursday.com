import React from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import moment from 'moment';
import './App.css';

function App() {
  const { width, height } = useWindowSize();
  const weekday = moment().day();
  return (
    <div className="App">
      <Confetti
        width={width}
        height={height}
        style={{ pointerEvents: 'none' }}
      />
      <div className="hummus-container">
        <div>
          {weekday === 4 ? 'Happy Hummus Thursday!' : 'Prepare for Hummus Thursday!'}
        </div>
        <a
          style={{ color: '#0074D9' }}
          href="https://maps.google.com/maps/search/hummus"
        >
          Find Hummus!
        </a>
      </div>
    </div>
  );
}

export default App;

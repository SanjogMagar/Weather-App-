import { useState } from 'react';
import './App.css';
import axios from 'axios';
import clearImg from './assets/clear.png'; 
import clearImg1 from './assets/humidity.png'; 
import clearImg2 from './assets/wind.png'; 

function App() {
  const [input, setInput] = useState('');
  const [weather, setWeather] = useState({
    loading: false,
    data: null,
    error: false
  });

  const search = async (event) => {
    if (event.key === 'Enter') {
      const city = input.trim();
      if (!city) return; // prevent empty searches

      setWeather({ ...weather, loading: true, error: false });

      try {
        const res = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          {
            params: {
              q: city,
              units: "metric",
              appid: "072b753a6bbce03483388cdd722bc764"
            }
          }
        );

        setWeather({ loading: false, data: res.data, error: false });
      } catch (err) {
        setWeather({ loading: false, data: null, error: true });
      }

      setInput('');
    }
  };

  return (
    <div className="App">
      <div className="weather-app">
        <div className="city-search">
          <input
            type="text"
            className="city"
            placeholder="Enter city name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={search}
          />
        </div>

        {weather.loading && <p>Loading...</p>}

        {weather.error && <p style={{ color: 'red' }}>City not found or error occurred!</p>}

        {weather.data && (
          <div className="weather-info">
            <h2>{weather.data.name}, {weather.data.sys.country}</h2>

            <div className='row'>
            <div className="images">
              <img
                src={clearImg}
                alt="Temperature Icon"
                className="images-icon"
              />
              <span>Temperature: <br></br>{weather.data.main.temp}°C</span>
            </div>

            <div className="images">
              <img
              src={clearImg1}
              alt='Humidity Icon'
              className="images-icon"
              />

               <span>Humidity: <br></br>{weather.data.main.humidity}%</span>
              </div>

          
            </div>


             <div className='row1'>
            <div className="images">
              <img
                src={clearImg2}
                alt="Smoke Icon"
                className="images-icon"
              />
              <span>Wind: <br></br>{weather.data.wind.speed} m/s</span>
            </div>

            <div className="images">
            

               <span>Weather: <br></br> {weather.data.weather[0].description}</span>
              </div>

          
            </div>


          
          
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

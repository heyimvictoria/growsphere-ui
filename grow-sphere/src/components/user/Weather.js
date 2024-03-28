import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';

function WeatherComponent() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(`http://localhost:8080/weather?city=${encodeURIComponent(city)}`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const kelvinToFahrenheit = (temp) => {
    return ((temp - 273.15) * 9/5 + 32).toFixed(2); // Convert Kelvin to Fahrenheit and round to 2 decimal places
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const hours = date.getHours() % 12 || 12; // Convert hours to 12-hour format
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM'; // Determine AM/PM
    return `${hours}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()} ${ampm}`; // Format as hh:mm AM/PM
  };

  const groupWeatherByDay = () => {
    if (!weatherData) return {};

    const groupedByDay = {};

    weatherData.list.forEach((item) => {
      const date = item.dt_txt.split(' ')[0]; // Extract date from timestamp
      if (!groupedByDay[date]) {
        groupedByDay[date] = [];
      }
      groupedByDay[date].push(item);
    });

    return groupedByDay;
  };

  return (
    <div>
      <h1>Weather Information</h1>
      
      <Form onSubmit={handleSubmit}>
      <Form.Group controlId="cityName">
        <Form.Label>Enter city name</Form.Label>
        <FormControl
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Button as="input" type="submit" value="Get Weather" />{' '}
      {/* <Button type="submit">Get Weather</Button> */}
    </Form>
      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
        <button type="submit">Get Weather</button>
      </form> */}
      {weatherData && (
        <div>
          {Object.entries(groupWeatherByDay()).map(([date, weatherByDay]) => (
            <div key={date} className="weather-container">
              <h2>{date}</h2>
              {weatherByDay.map((weather) => (
                <div key={weather.dt} className="weather-details">
                  <p><strong>Time:</strong> {formatTime(weather.dt_txt)}</p>
                  <p><strong>Temperature:</strong> {kelvinToFahrenheit(weather.main.temp)} °F</p>
                  {/* Render other weather details here */}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WeatherComponent;






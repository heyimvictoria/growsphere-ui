import React, { useState } from 'react';
import { Form, FormControl, Button, Card } from 'react-bootstrap';
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
    

    if (!weatherData || !weatherData.list) return {}; // Check if weatherData or weatherData.list is null or undefined

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
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' });
  };

const mmToInches = (mm) => {
    // Convert millimeters to inches using the conversion factor
    return (mm * 0.0393701).toFixed(2); // Round to 2 decimal places
  };


  

const getCardBackground = (weather) => {
    if (weather && weather.weather && weather.weather[0]) {
      const weatherMain = weather.weather[0].main;
      const weatherDescription = weather.weather[0].description.toLowerCase(); // Convert description to lowercase for case-insensitive comparison
      if (weatherMain === 'Rain') {
        return 'bg-primary'; // Use primary background color for rainy weather
      } else if (weatherMain === 'Clouds') {
        if (weatherDescription.includes('broken')) {
          return 'bg-secondary-light'; // Use a lighter shade for broken clouds
        } else if (weatherDescription.includes('overcast')) {
          return 'bg-secondary-dark'; // Use a darker shade for overcast clouds
        } else if (weatherDescription.includes('few')) {
          return 'bg-info'; // Use info background color for few clouds
        }
      }
    }
    return 'bg-warning'; // Use warning background color for other weather conditions
  };

//   return (
//  <div>
// <h1 className="mb-4">Weather Information</h1>
// <Form onSubmit={handleSubmit} className="mb-4">
//   <Form.Group controlId="cityName">
//     <Form.Label>Enter city name</Form.Label>
//     <FormControl
//       type="text"
//       placeholder="Enter city name"
//       value={city}
//       onChange={handleInputChange}
//     />
//   </Form.Group>
//   <Button variant="primary" type="submit">
//     Get Weather
//   </Button>
// </Form>
// {weatherData && (
    
//       <div>
//         {Object.entries(groupWeatherByDay()).map(([date, weatherByDay]) => (
//           <div key={date} className="weather-day mb-4">
//             <h2>{formatDate(date)}</h2>
//             {weatherByDay.map((weather) => (
//               <Card key={weather.dt} className={`weather-card ${getCardBackground(weather)}`}>
//                 <Card.Body>
//                   <Card.Title>{formatTime(weather.dt_txt)}</Card.Title>
//                   <Card.Text>
//                     <strong>Temperature:</strong> {kelvinToFahrenheit(weather.main.temp)} °F<br />
//                     <strong>Feels Like:</strong> {kelvinToFahrenheit(weather.main.feels_like)} °F<br />
//                     <strong>Low Temp:</strong> {kelvinToFahrenheit(weather.main.temp_min)} °F<br />
//                     <strong>High Temp:</strong> {kelvinToFahrenheit(weather.main.temp_max)} °F<br />
//                     {weather.weather && weather.weather[0] && (
//                       <div>
//                         <strong>Condition:</strong> {weather.weather[0].main}<br />
//                         <strong>Description:</strong> {weather.weather[0].description}<br />
//                       </div>
//                     )}
//                     {weather.weather && weather.weather[0] && weather.weather[0].main === 'Rain' && weather.rain && (
//                      <p>
//                      <strong>Rain (3h):</strong> {mmToInches(weather.rain["3h"])} inches
//                    </p>
//                     )}
//                   </Card.Text>
//                 </Card.Body>
//               </Card>
//             ))}
//           </div>
//         ))}
//       </div>
//     )}
//   </div>
// );
return (
    <div>
  <h1 className="mb-4">Weather Information</h1>
  <Form onSubmit={handleSubmit} className="mb-4">
    <Form.Group controlId="cityName">
      <Form.Label>Enter city name</Form.Label>
      <FormControl
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={handleInputChange}
      />
    </Form.Group>
    <Button variant="primary" type="submit">
      Get Weather
    </Button>
  </Form>
  {weatherData && (
    <div>
      {Object.entries(groupWeatherByDay()).map(([date, weatherByDay]) => (
        <Card key={date} className="weather-day mb-4">
          <Card.Body>
            <Card.Title>{formatDate(date)}</Card.Title>
            <div className="weather-hours">
              {weatherByDay.map((weather) => (
                <Card key={weather.dt} className={`weather-card ${getCardBackground(weather)}`}>
                  <Card.Body>
                    <Card.Title>{formatTime(weather.dt_txt)}</Card.Title>
                    <Card.Text>
                      <strong>Temperature:</strong> {kelvinToFahrenheit(weather.main.temp)} °F<br />
                      <strong>Feels Like:</strong> {kelvinToFahrenheit(weather.main.feels_like)} °F<br />
                      <strong>Low Temp:</strong> {kelvinToFahrenheit(weather.main.temp_min)} °F<br />
                      <strong>High Temp:</strong> {kelvinToFahrenheit(weather.main.temp_max)} °F<br />
                      {weather.weather && weather.weather[0] && (
                        <div>
                          <strong>Condition:</strong> {weather.weather[0].main}<br />
                          <strong>Description:</strong> {weather.weather[0].description}<br />
                        </div>
                      )}
                      {weather.weather && weather.weather[0] && weather.weather[0].main === 'Rain' && weather.rain && (
                        <p>
                          <strong>Rain (3h):</strong> {mmToInches(weather.rain["3h"])} inches
                        </p>
                      )}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  )}
</div>

)
}

export default WeatherComponent;






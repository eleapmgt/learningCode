import React from 'react'
import axios from 'axios'
import REACT_APP_API_KEY from '.env'

import { useState, useEffect } from 'react'

const Country = ( {country} ) => {

  const [weather, setWeather] = useState(null);
  const api_key = process.env.REACT_APP_API_KEY;
  const weatherUrl = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`;

  useEffect(() => {
    axios
      .get(weatherUrl)
      .then(response => {
        setWeather(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [weatherUrl]);

  return (
    <div>
      <h2>Name: {country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}km2</p>
      <p><strong>Languages:</strong></p>{country.languages.map(language => (
      <ul>
          <li key={language.iso639_1}>{language.name}</li>
      </ul>
        ))}
      <img src={country.flags.png} alt={country.name.common} />
      {weather && (
        <div>
          <h3>Weather in {country.name}</h3>
          <p>Temperature: {weather.current.temperature} °C</p>
          <p>Humidity: {weather.current.humidity}%</p>
          <p>Wind speed: {weather.current.wind_speed} km/h</p>
          <p>Weather description: {weather.current.weather_descriptions[0]}</p>
          <img src={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions[0]} />
        </div>
      )}
    </div>
  )
}

export default Country

import React from 'react'
import Country from './Country'

const Countries = ({ filteredCountries, handleCountriesList }) => {

  if (filteredCountries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (filteredCountries.length === 1) {
    return (
      <Country country={filteredCountries[0]}/>
    )
  }

  return (
    <ul>
      {filteredCountries.map(filteredCountry =>
        <li key={filteredCountry.cca3}>
          {filteredCountry.name}
          <button onClick={() =>
            handleCountriesList(filteredCountry.name)}>
              Show
          </button>
        </li>)}
    </ul>
  )
  }

export default Countries

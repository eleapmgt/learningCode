import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  // 2 variables d'état : une pour la data de l'API et l'autre pour l'input de recherche
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  // Récupération de la data de l'API
  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        // Vérification avec console.log
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  };

  useEffect(hook, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  };

  const handleCountriesList = (name) => {
    setFilter(name)
  }

  const filteredCountries =
    filter === ''
      ? []
      : countries.filter(country =>
        country.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <Filter value={filter} onChange={handleFilterChange}/>
      <Countries filteredCountries={filteredCountries} handleCountriesList={handleCountriesList}/>
    </div>
  )
}

export default App

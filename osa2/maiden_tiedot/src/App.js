import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import MainInput from './components/MainInput'
import CountryView from './components/CountryView'


const App = () => {

  const [countries, setcountries] = useState([]);
  const [search, setSearch] = useState('');

  const handleSearchChange = (event) => setSearch(event.target.value)

  useEffect(() => {
      axios
          .get("https://restcountries.eu/rest/v2/all")
          .then(response => {
            setcountries(response.data)
          })
  },[])

  return (
    <>
      <MainInput handleSearchChange={handleSearchChange} />
      <CountryView countries={countries} search={search} handleSearchChange={handleSearchChange} />
    </>
  )
}




ReactDOM.render(<App />, document.getElementById('root'))

export default App
import React, { useState, useEffect } from "react"
import axios from "axios"

const useField = (type) => {
  const [value, setValue] = useState("")

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  console.log("effect")

  const hook = () => {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
      .then((response) => {
        response.data[0].found = true
        console.log(response.data[0])
        setCountry(response.data[0])
      })
      .catch((error) => console.log("error"))
  }

  useEffect(hook, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return <div>not found...</div>
  }
  console.log(country.data)
  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div>
      <img
        src={country.flag}
        height="100"
        alt={`flag of ${country.name}`}
      />
    </div>
  )
}

const App = () => {
  const nameInput = useField("text")
  const [name, setName] = useState("")
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App

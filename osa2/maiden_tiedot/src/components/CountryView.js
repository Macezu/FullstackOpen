import React,{ useEffect,useState } from 'react'
import axios from 'axios'


const tooMany = () => (<p>Too Many Matches, specify another filter</p>)
const ListLanguages = ({ language }) => <li key="id">{language}</li>

const ListCountry = ({ country,handleSearchChange }) => {
    return (
        <>
            <li key="id">{country.name}</li>  <button onClick={handleSearchChange} value={country.name}>show</button>
        </>
    )
}

const GetWeather = (capital,setWeather) => {

    const api_key = process.env.REACT_APP_API_KEY
    const options = {
        method: 'GET',
        url: 'https://community-open-weather-map.p.rapidapi.com/weather',
        params: {
            q: `${capital}`,
            units: 'metric',
            mode: ''
        },
        headers: {
            'x-rapidapi-key': 'e98e7804c3msh813873c0b33544bp135155jsnb225b4ce8216',
            'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
        }
    };

    useEffect(()=>{

        axios
        .request(options)
        .then(response => {
            const weatherobj = {
                "desc": response.data.weather[0].description,
                "temp": response.data.main.temp
            }
            console.log(weatherobj)
            setWeather(weatherobj)

        }).catch(Error)
    },[])
        

}


const DetailedCountry = (filtered) => {

    const [weather,setWeather] = useState({})

    const countryobj = filtered[0]
    const languages = countryobj.languages
    GetWeather(countryobj.capital,setWeather)
    const listedlanguages = languages.map((language,i) => <ListLanguages key={i} language={language.name} />)
    return (
        <>
            <h2>{countryobj.name}</h2>

            <p>capital {countryobj.capital}</p>
            <p>population {countryobj.population}</p>
            <h3>languages</h3>
            <ul>
                {listedlanguages}
            </ul>
            <img alt="Flaglogo" src={filtered[0].flag} height="150" width="220" />
            <p>In {countryobj.capital} the weather is {weather.desc}. Temperature {weather.temp}C</p>
        </>
    )
}

const CountryView = ({ countries,search,handleSearchChange }) => {

    const filtered = countries.filter(val => val.name.toUpperCase().includes(search.toUpperCase()))
    switch (true) {
        case (filtered.length > 10):
            return tooMany()
        case (filtered.length > 1):
            const listedCountries = filtered.map((country,i) => <ListCountry key={i} country={country} handleSearchChange={handleSearchChange} />)
            return (
                <ul>
                    {listedCountries}
                </ul>
            )
        case (filtered.length === 1):
            return DetailedCountry(filtered)
        default:
            return <p>404 PLZ GET HELP</p>
    }




}

export default CountryView
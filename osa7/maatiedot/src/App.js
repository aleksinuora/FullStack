import React, { useState, useEffect } from 'react'
import axios from 'axios'

const dbug = false
const dataHost = 'https://restcountries.com/v3.1/all'


const App = () => {
  const [countries, setCountries] = useState()
  const [dataReady, setDataReady] = useState(false)
  const [filterPhrase, setFilter] = useState('')
  
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    if (dbug) console.log(event.target.value)
  }

  useEffect(() => {
    if (dbug) console.log('haetaan dataa osoitteesta', dataHost)
    axios.get(dataHost)
          .then(response => {

            if (dbug) console.log('löydettiin:')

            setCountries(response.data)
            setDataReady(true)
          })
  }, [])

  return (
    <div>
      <Filter filterPhrase={filterPhrase}
        handleFilterChange={handleFilterChange}/>
      {(dataReady) ? <RenderCountries countries={countries} filterPhrase={filterPhrase} setFilter={setFilter}/>
                   : <div></div>}
    </div>
  );
}

//komponentit

const Filter = (props) => {
  if (dbug) console.log('renderöidään filtteri...')

  return (
    <>
    find countries <input
      value={props.filterPhrase}
      onChange={props.handleFilterChange}
      />
    </>
  )
}

const RenderCountries = ({ countries, filterPhrase, setFilter }) => {
  if (dbug) console.log('listataat filtteröidyt maat...', filterPhrase)

  const fltrdCntrs = countries.filter(country => 
                          country.name.common
                          .toLowerCase()
                          .includes(filterPhrase.toLowerCase())                           
                        )
  const cntrsLength = fltrdCntrs.length
  
  if (dbug) console.log('renderöidään maalista...', fltrdCntrs.length)
  if (dbug) {
    (cntrsLength < 11) ? console.log(fltrdCntrs)
                             : console.log('liikaa maita')
  }

  return (
    <div>
      {(cntrsLength == 1)
        ? <RenderCountry country={fltrdCntrs[0]}/>
        : (cntrsLength > 10) 
          ? <p>Too many countries, try to be more specific</p>
          : <CountryNames countries={fltrdCntrs} setFilter={setFilter}/>
        }
    </div>
  ) 
}

const CountryNames = ({ countries, setFilter }) => {
  return (
    <>
    {countries.map(country => <p key={country.name.official}>
      {country.name.common}
      <button onClick={() => setFilter(country.name.common)}>
        show</button>
    </p>)}
    </>
  )
}

const RenderCountry = ({ country }) => {
  if (dbug) console.log('renderöidään yksi maa...')

  const names = country.name
  const nameCommon = names.common

  if (dbug) console.log('nimi luettu: ', nameCommon)

  const capitals = country.capital
  const capital = (capitals.length > 0) ? capitals[0]
                                        : 'none'
  const population = country.population

  return (
    <>
    <h1>{nameCommon}</h1>
    <p>
      capital: {capital}
      <br/>
      population: {population}
    </p>
    <h2>languages</h2>
    <RenderLanguages country={country}/>
    <RenderFlag country={country}/>
    </>
  )
}

const RenderLanguages = ({ country }) => {
  if (dbug) console.log('yritetään printata kielet', Object.values(country.languages))

  const langArr = Object.values(country.languages)

  return (
    <ul>
      {langArr.map(lang => <li key={lang}>{lang}</li>)}
    </ul>
  )
}

const RenderFlag = ({ country }) => {
  const flagUrl = country.flags.png

  if(dbug) console.log('haetaan lippu osoitteesta', flagUrl)

  return (
    <img src={flagUrl}/>
  )
}

const RenderWeather = ({ country }) => {
  if (dbug) console.log('renderöidään säätiedot')
  const [weather, setWeather] = useState()
  const [available, setAvailable] = useState(false)

  useEffect(() => {
    if (dbug) console.log('haetaan säädataa')
    const options = {
      method: 'GET',
      url: 'https://community-open-weather-map.p.rapidapi.com/weather',
      params: {q: country.capital[0], units: 'metric'},
      headers: {
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        'x-rapidapi-key': ''
      }
    };
    
    axios.request(options).then(function (response) {
      if (dbug) console.log(response.data)
      setWeather(response.data)
      setAvailable(true)
    }).catch(function (error) {
      console.error(error)
    })
  }, [])

  return (
    <div>
      <h2>Weather in {country.capital[0]}</h2>
      {setAvailable ? (<p>{weather.weather[0].description}
                        <br/>
                        Temperature: {weather.main.temp}
                        <br/>
                        Clouds: {weather.clouds.all}
                        <br/>
                        Wind: {weather.wind.speed}
                      </p>
                      )
                    : <p>No weather data available</p>}
    </div>
  )
}

export default App;

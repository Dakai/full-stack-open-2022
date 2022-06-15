import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const CountryButton = ({ countryId, setShowFilter }) => {
  const handleClick = () => {
    //console.log(countryId);
    setShowFilter([countryId]);
  };
  return (
    <>
      <button onClick={handleClick}>show</button>
    </>
  );
};

const Country = ({ country }) => {
  //console.log("country", country);
  const languages = country.languages;
  const flag = country.flags.png;
  //const arrayLanguage = JSON.parse(languages);
  //console.log(typeof languages);
  //console.log(Object.values(languages));
  const arrayLanguages = Object.values(languages);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>
        capital {country.capital}
        <br />
        area {country.area}
      </p>
      <b>languages:</b>
      <ul>
        {arrayLanguages.map((language, i) => (
          <li key={i}>{language}</li>
        ))}
      </ul>
      <p>
        <img src={flag} alt="flag" />
      </p>
    </div>
  );
};

const Weather = ({ countries, showFilter, weather, setWeather }) => {
  //console.log("showFilter", showFilter);
  const api_key = process.env.REACT_APP_API_KEY;
  const GetWeather = (city) => {
    useEffect(() => {
      axios
        .get(
          "http://api.weatherapi.com/v1/current.json?key=" +
            api_key +
            "&q=" +
            city
        )
        .then((response) => {
          //console.log("response", response.data.current.condition.icon);
          setWeather(response.data);
          console.log("response");
        });
    }, []);
  };
  if (showFilter.length === 1) {
    const city = countries[showFilter[0]].capital;
    GetWeather(city);
    const isEmpty = Object.keys(weather).length === 0;
    while (!isEmpty) {
      console.log(weather);
      const weatherIcon = "https:" + weather.current.condition.icon;
      return (
        <>
          <h3>Weather in {city}</h3>
          <img src={weatherIcon} alt="weatherIcon" />
          <p>wind {weather.current.wind_kph} kph</p>
        </>
      );
    }
  }
};

const Filter = ({ countries, showFilter, setShowFilter }) => {
  //console.log("showFilter", showFilter);
  if (showFilter.length <= 10 && showFilter.length > 1) {
    return (
      <div>
        <ul>
          {countries.map((country, i) =>
            showFilter.includes(i) ? (
              <li key={i}>
                {country.name.common}
                <CountryButton countryId={i} setShowFilter={setShowFilter} />
              </li>
            ) : null
          )}
        </ul>
      </div>
    );
  } else if (showFilter.length === 1) {
    return <Country country={countries[showFilter[0]]} />;
  } else if (showFilter.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  }
};

function App() {
  const [countries, setCountries] = useState([]);
  const [showFilter, setShowFilter] = useState([]);
  const [weather, setWeather] = useState([]);
  //const [newName, setNewName] = useState();

  //let countryIDs = [];
  //const [showFilter, setShowFilter] = useState();
  //let maxID;

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all/").then((response) => {
      //console.log("response", response.data);
      setCountries(response.data);
    });
  }, []);

  const filterArray = (newName) => {
    //console.log(newName.toLowerCase());
    const arrayData = [];
    countries.map((country, i) => {
      if (country.name.common.toLowerCase().includes(newName.toLowerCase())) {
        arrayData.push(i);
        //console.log(arrayData);
      }
      return setShowFilter(arrayData);
    });
  };

  const handleNameChange = (event) => {
    //setNewName(event.target.value);
    filterArray(event.target.value);
  };

  return (
    <div>
      Find countries:
      <input onChange={handleNameChange} />
      <Filter
        countries={countries}
        showFilter={showFilter}
        setShowFilter={setShowFilter}
      />
      <Weather
        countries={countries}
        showFilter={showFilter}
        weather={weather}
        setWeather={setWeather}
      />
      {/*<Countries countries={countries} />*/}
    </div>
  );
}

export default App;

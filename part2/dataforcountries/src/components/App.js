import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import Results from './Results';
import Country from './Country';
import Weather from './Weather';
import axios from 'axios';

const App = () => {
    const [ filter, setFilter ] = useState('');
    const [ countries, setCountries ] = useState([]);
    const [ country, setCountry ] = useState({});
    const [ weather, setWeather ] = useState({});

    const onFilterChange = (evt) => setFilter(evt.target.value);

    const hookCountry = () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data);
            })
            .catch(error => console.log(error));
    };

    const hookWeather = () => {
        axios
            .get('https://api.apixu.com/v1/current.json?key=66f60f1ef0d24fbf9ed73608190909&q='+country.capital)
            .then(response => {
                setWeather(response.data);
            })
            .catch(error => console.log(error));
    };

    useEffect(hookCountry, []);
    useEffect(hookWeather, [country]);

    return (
        <>
            <Filter
                filter={filter}
                onFilterChange={onFilterChange} />
            <Results
                filter={filter}
                countries={countries}
                setCountry={setCountry} />
            <Country
                country={country} />
            <Weather
                weather={weather} />
        </>
    );
};

export default App;

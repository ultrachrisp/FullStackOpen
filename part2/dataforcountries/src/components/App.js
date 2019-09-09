import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import Results from './Results';
import Country from './Country';
import axios from 'axios';

const App = () => {
    const [ filter, setFilter ] = useState('');
    const [ countries, setCountries ] = useState([]);
    const [ country, setCountry] = useState({});

    const onFilterChange = (evt) => setFilter(evt.target.value);

    const hook = () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data);
            });
    };

    useEffect(hook, []);

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
                country={country}/>
        </>
    );
};

export default App;

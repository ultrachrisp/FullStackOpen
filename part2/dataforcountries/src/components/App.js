import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import axios from 'axios';

const App = () => {
    const [ filter, setFilter ] = useState('');
    const [ country, setCountry ] = useState([]);

    const onFilterChange = (evt) => setFilter(evt.target.value);

    const hook = () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountry(response.data);
            });
    };

    useEffect(hook, []);

    return (
        <>
            <Filter
                filter={filter}
                onFilterChange={onFilterChange} />
        </>
    );
};

export default App;

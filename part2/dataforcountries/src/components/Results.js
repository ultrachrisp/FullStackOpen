import React from 'react';

const Results = ({filter, countries}) => {
    const match = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()));
    const numOfResults = match.length;
    console.log(match);
    
    if(filter === ""){
        return <></>;
    } else if(numOfResults > 10){
        return (
            <div>Too many matches, specify another filter</div>
        );
    } else if(numOfResults > 1 && numOfResults <= 9){
        return (
            <>
            { match.map(country => <div key={country.alpha3Code}>{country.name}</div>) }
            </>
        );
    } else {
        const country = match[0];
        return (
            <>
                <h2>{country.name}</h2>
                <div>Capital: {country.capital}</div>
                <div>Population: {country.population}</div>
                <h3>Languages</h3>
                <ul>
                    {country.languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}
                </ul>
                <img src={country.flag} width="100px"/>
            </>
        );
    }
};

export default Results;

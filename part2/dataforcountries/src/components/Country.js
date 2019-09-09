import React from 'react';

const Country = ({country}) => {
    if(Object.entries(country).length === 0 && country.constructor === Object){
        return <></>;
    }
    
    const {name, capital, population, languages, flag} = country;
    return (
        <>
            <h2>{name}</h2>
            <div>Capital: {capital}</div>
            <div>Population: {population}</div>
            <h3>Languages</h3>
            <ul>
                {languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}
            </ul>
            <img alt={name + " flag"} src={flag} width="100px"/>
        </>
    );
};

export default Country;

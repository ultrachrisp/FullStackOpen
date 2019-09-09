import React from 'react';

const Results = ({filter, countries, setCountry}) => {
    const match = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()));
    const numOfResults = match.length;

    const showCountryDetails = (evt) => {
        setCountry(match.filter(country => country.name === evt.target.value)[0]);
    };
    
    if(filter === ""){
        return <></>;
    } else if(numOfResults > 10){
        return (
            <div>Too many matches, specify another filter</div>
        );
    } else if(numOfResults > 1 && numOfResults <= 9){
        return (
            <>
                { match.map(country =>
                            <div
                                key={country.alpha3Code}>
                                {country.name}
                                <button
                                    onClick={showCountryDetails}
                                    value={country.name}> show </button>
                            </div>) }
            </>
        );
    } else {

        setCountry(match[0]);
        
        return <></>;
    }
};

export default Results;

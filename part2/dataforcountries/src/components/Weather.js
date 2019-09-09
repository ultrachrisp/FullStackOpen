import React from 'react';

const Weather = ({weather}) => {
    if(Object.entries(weather).length === 0 && weather.constructor === Object){
        return <></>;
    }

    const { current, location } = weather;
    return <>
               <h3>Weather in {location.name}</h3>
               <div><b>Tempreature:</b> {current.temp_c} Celsius</div>
               <img alt={"weather in " + location.name} src={"https:"+current.condition.icon}/>
               <div><b>Wind:</b> {current.wind_kph} kph direction {current.wind_dir}</div>
           </>;
};

export default Weather;

import React from 'react';

const ForecastInfo = (props) => {

  let pArray = [];

  for (let i = 0; i < 5; i++){
    pArray.push(
      <div key={i}>
        <img src={props.forecast.forecast.simpleforecast.forecastday[i].icon_url}></img>
        <p>{props.forecast.forecast.simpleforecast.forecastday[i].date.weekday}</p>
        {
          props.units === 'imperial' ? (
            <div>
              <p>High: {props.forecast.forecast.simpleforecast.forecastday[i].high.fahrenheit} ˚F</p>
              <p>Low: {props.forecast.forecast.simpleforecast.forecastday[i].low.fahrenheit} ˚F</p>
            </div>
          ) : (
             <div>
               <p>High: {props.forecast.forecast.simpleforecast.forecastday[i].high.celsius} ˚C</p>
               <p>Low: {props.forecast.forecast.simpleforecast.forecastday[i].low.celsius} ˚C</p>
             </div>
           )
        }
        <p>{props.forecast.forecast.simpleforecast.forecastday[i].conditions}</p>
      </div>
    )
  }

  return (
    <div>
      {pArray}
    </div>
  )
}

export default ForecastInfo;

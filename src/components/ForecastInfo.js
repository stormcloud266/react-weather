import React from 'react';

const ForecastInfo = (props) => {

  let pArray = [];

  for (let i = 1; i < 4; i++){
    const tempHigh = props.forecast.data[i].temperatureHigh;
    const tempLow = props.forecast.data[i].temperatureLow;
    const time = props.forecast.data[i].time

    pArray.push(
      <div className="forecast-info__array" key={i}>
        <h3>{props.timeConversion(time, 'day')}</h3>
        <div>
          <i className={`wi ${props.iconSelector(props.forecast.data[i].icon)}`}></i>
        </div>
        <div>
          <p>High: {props.tempConversion(tempHigh)}</p>
          <p>Low: {props.tempConversion(tempLow)}</p>
        </div>
        <p>{props.forecast.data[i].summary}</p>
      </div>
    )
  }

  return (
    <div className="forecast-info">
      {pArray}
    </div>
  )
}

export default ForecastInfo;

import React from 'react';

const ForecastInfo = (props) => {

  let pArray = [];

  for (let i = 0; i < 3; i++){
    const tempHigh = props.forecast.data[i].temperatureHigh;
    const tempLow = props.forecast.data[i].temperatureLow;
    const time = props.forecast.data[i].time

    pArray.push(
      <div className="forecast-info__array" key={i}>
        <div>
          <i className={`wi ${props.iconSelector(props.forecast.data[i].icon)}`}></i>
        </div>
        <p>{props.timeConversion(time, 'day')}</p>
        <div>
          <p>{props.tempConversion(tempLow)} / {props.tempConversion(tempHigh)}</p>
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

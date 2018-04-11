import React from 'react';

const ForecastInfo = (props) => {

  let pArray = [];

  for (let i = 0; i < 3; i++){
    pArray.push(
      <div key={i}>
        {/* <img src={props.forecast.}></img> */}
        <p>{props.forecast.data[i].time}</p>
        <div>
          <p>High: {props.forecast.data[i].temperatureHigh} ˚F</p>
          <p>Low: {props.forecast.data[i].temperatureLow} ˚F</p>
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

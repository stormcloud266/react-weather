import React from 'react';

const HourlyInfo = (props) => {

  let pArray = [];

  for (let i = 1; i < 6; i++) {

    const temp = props.hourly.data[i].temperature;
    const time = props.hourly.data[i].time;

    pArray.push(
      <div className="hourly-info__array" key={i}>
        {/* <img src={props.hourly.hourly_forecast[i].icon_url}></img> */}
        <p>{props.tempConversion(temp)}</p>
        <p>{props.timeConversion(time, 'hour')}</p>
        <p>{props.hourly.data[i].summary}</p>
      </div>
    )
  };

  return (
    <div className="hourly-info">
      <div className="hourly-info__array-container">
        {pArray}
      </div>
    </div>
  )
}

export default HourlyInfo;

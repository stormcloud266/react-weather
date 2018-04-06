import React from 'react';

const HourlyInfo = (props) => {

  let pArray = [];
  for (let i = 0; i < 10; i++) {
    pArray.push(
      <div key={i}>
        <p>{props.hourly.hourly_forecast[i].FCTTIME.civil}</p>
        {
          props.units === 'imperial' ?
          <p>{props.hourly.hourly_forecast[i].temp.english} ˚F</p> :
          <p>{props.hourly.hourly_forecast[i].temp.metric} ˚C</p>
        }
        <p>{props.hourly.hourly_forecast[i].condition}</p>
      </div>
    )
  };

  return (
    <div>
      {pArray}
    </div>
  )
}

export default HourlyInfo;

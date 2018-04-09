import React from 'react';

const HourlyInfo = (props) => {

  const pushArray = (i, arr) => {
    arr.push(
      <div key={i}>
        <img src={props.hourly.hourly_forecast[i].icon_url}></img>
        <p>{props.hourly.hourly_forecast[i].FCTTIME.civil}</p>
        {
          props.units === 'imperial' ?
          <p>{props.hourly.hourly_forecast[i].temp.english} ˚F</p> :
          <p>{props.hourly.hourly_forecast[i].temp.metric} ˚C</p>
        }
        <p>{props.hourly.hourly_forecast[i].condition}</p>
      </div>
    )
  }

  let pArray1 = [];
  let pArray2 = [];

  for (let i = 0; i < 5; i++) {
    pushArray(i, pArray1);
  };
  for (let i = 5; i < 10; i++) {
    pushArray(i, pArray2);
  };

  return (
    <div className="hourly-info">
      <div className="hourly-info__array-container">
        {pArray1}
      </div>
      {/* <div className="hourly-info__array-container">
        {pArray2}
      </div> */}

    </div>
  )
}

export default HourlyInfo;

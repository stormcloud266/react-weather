import React from 'react';

const CurrentInfo = (props) => {
  return (
    <div className="current-info">

        {
          props.units === 'imperial' ? (
            <div className="current-info__inner">
              <div>
                <p>Feels like: {props.iFeelsLike} ˚F</p>
                <p>Wind Speed: {props.iWindSpeed} mph</p>
                <p>Wind Direction: {props.windDirection}</p>
              </div>
              <div>
                <p>Visibility: {props.iVisibility} mi</p>
                <p>Humidity: {props.humidity}</p>
              </div>
            </div>
          )
         : (
           <div className="current-info__inner">
             <div>
               <p>Feels like: {props.mFeelsLike} ˚C</p>
               <p>Wind Speed: {props.mWindSpeed} kph</p>
               <p>Wind Direction: {props.windDirection}</p>
             </div>
             <div>
               <p>Visibility: {props.mVisibility} km</p>
               <p>Humidity: {props.humidity}</p>
             </div>
           </div>
         )

        }
    </div>
  )
}

export default CurrentInfo;

import React from 'react';

const CurrentInfo = (props) => {
  return (
    <div>

        {
          props.units === 'imperial' ? (
            <div>
              <div>
                <p>Feels like: {props.iFeelsLike} ˚F</p>
                <p>Wind Speed: {props.iWindSpeed} mph</p>
                <p>Wind Direction: {props.windDirection}</p>
              </div>
              <div>
                <p>Visibility: {props.iVisibility} miles</p>
                <p>Humidity: {props.humidity}</p>
              </div>
            </div>
          )
         : (
           <div>
             <div>
               <p>Feels like: {props.mFeelsLike} ˚C</p>
               <p>Wind Speed: {props.mWindSpeed} kph</p>
               <p>Wind Direction: {props.windDirection}</p>
             </div>
             <div>
               <p>Visibility: {props.mVisibility} kilometers</p>
               <p>Humidity: {props.humidity}</p>
             </div>
           </div>
         )

        }
    </div>
  )
}

export default CurrentInfo;

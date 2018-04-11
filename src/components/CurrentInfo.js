import React from 'react';

const CurrentInfo = (props) => {

  return (
    <div className="current-info">

      <div className="current-info__inner">
        <div>
          <p>Feels Like: {props.current.apparentTemperature} {props.units === 'us' ? '˚F' : '˚C'}</p>
          <p>Wind Speed: {props.current.windSpeed} mph</p>
          <p>Chance of Precipitation: {props.current.precipProbability}%</p>
        </div>
        <div>
          <p>Visibility: {props.current.visibility} mi</p>
          <p>Humidity: {props.current.humidity}</p>
        </div>
      </div>

    </div>
  )
}


// const CurrentInfo = (props) => {
//   return (
//     <div className="current-info">
//
//         {
//           props.units === 'us' ? (
//             <div className="current-info__inner">
//               <div>
//                 <p>Feels Like: {props.apparentTemperature} ˚F</p>
//                 <p>Wind Speed: {props.windSpeed} mph</p>
//                 <p>Chance of Precipitation: {props.precipProbability}</p>
//               </div>
//               <div>
//                 <p>Visibility: {props.visibility} mi</p>
//                 <p>Humidity: {props.humidity}</p>
//               </div>
//             </div>
//           )
//          : (
//            <div className="current-info__inner">
//              <div>
//                <p>Feels like: {props.mFeelsLike} ˚C</p>
//                <p>Wind Speed: {props.mWindSpeed} kph</p>
//                <p>Wind Direction: {props.windDirection}</p>
//              </div>
//              <div>
//                <p>Visibility: {props.mVisibility} km</p>
//                <p>Humidity: {props.humidity}</p>
//              </div>
//            </div>
//          )
//
//         }
//     </div>
//   )
// }

export default CurrentInfo;

import React from 'react';

const CurrentInfo = (props) => {

  const lenConversion = () => {
    if (props.units === 'us') {
      return (Math.round(props.current.visibility)) + ' mi'
    } else if (props.units === 'is') {
      return (Math.round(props.current.visibility * 1.60934)) + ' km'
    }
  }
  const speedConversion = () => {
    if (props.units === 'us') {
      return (Math.round(props.current.windSpeed)) + ' mph'
    } else if (props.units === 'is') {
      return (Math.round(props.current.windSpeed * 1.60934)) + ' kph'
    }
  }

  const appTemp = props.current.apparentTemperature

  return (
    <div className="current-info">

      <div className="current-info__inner">
        <div>
          <p>Feels Like: {props.tempConversion(appTemp)}</p>
          <p>Wind Speed: {speedConversion()}</p>
          <p>Chance of Precipitation: {Math.round(props.current.precipProbability * 100)}%</p>
        </div>
        <div>
          <p>Visibility: {lenConversion()}</p>
          <p>Humidity: {Math.round(props.current.humidity * 100)}%</p>
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

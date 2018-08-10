import React from 'react';

const CurrentCard = (props) => {

  const temp = props.current.temperature;

  return (
    <div className="current-card--inner">
      <p className="current-card--inner__currently">Currently in {props.location}</p>
      <div className="current-card--inner__img-container">
        <i className={`wi ${props.iconSelector(props.current.icon)}`}></i>
      </div>
      <div>
        <h3 className="current-card--inner__temp">{props.tempConversion(temp)}{props.units === 'us' ? 'F' : 'C'}</h3>
        <p className="current-card--inner__cond">{props.current.summary}</p>
      </div>
    </div>
  )
}

export default CurrentCard;

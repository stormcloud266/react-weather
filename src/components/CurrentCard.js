import React from 'react';

const CurrentCard = (props) => {

  const temp = props.current.temperature

  return (
    <div className="currentCardInner">
      <p className="currentCardInner__currently">Currently in {props.location}</p>
      <div className="currentCardInner__img-container">
        <img
          // src={props.icon}
          className="currentCardInner__img"
          ></img>
      </div>
      <h3 className="currentCardInner__temp">{props.tempConversion(temp)}</h3>
      <p className="currentCardInner__cond">{props.current.summary}</p>
    </div>
  )
}

export default CurrentCard;

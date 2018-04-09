import React from 'react';

const CurrentCard = (props) => {
  return (
    <div className="currentCardInner">
      <p className="currentCardInner__currently">Currently in {props.loc}</p>
      <div className="currentCardInner__img-container">
        <img
          src={props.icon}
          className="currentCardInner__img"
          ></img>
      </div>
      {
        props.units === 'imperial' ?
        <h3 className="currentCardInner__temp">{props.iTemp} ˚F</h3> :
        <h3 className="currentCardInner__temp">{props.mTemp} ˚C</h3>
      }
      <p className="currentCardInner__cond">{props.cond}</p>
    </div>
  )
}

export default CurrentCard;

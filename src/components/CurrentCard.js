import React from 'react';

const CurrentCard = (props) => {
  return (
    <div>
      <p>Currently in {props.loc}</p>
      <img src={props.icon}></img>
      {
        props.units === 'imperial' ?
        <h3>{props.iTemp} ˚F</h3> :
        <h3>{props.mTemp} ˚C</h3>
      }
      <p>{props.cond}</p>
    </div>
  )
}

export default CurrentCard;

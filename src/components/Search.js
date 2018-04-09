import React from 'react';
import config from '../../config.json';

const Search = (props) => {

  const fetchData = (e) => {
    if (e.key === 'Enter') {
      const searchTerm = e.target.value.trim().replace(/ /g,"_");

      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchTerm}&key=${config.GEOCODE_API_KEY}`)
      .then(response => response.json())
      .then(json => {
        const lat = json.results[0].geometry.location.lat;
        const lng = json.results[0].geometry.location.lng;
        console.log(lat, lng);
        props.handleFetchData(lat, lng);
      })

      e.target.value = '';
    }
  }

  return (
    <div className="search">
      {/* <i className="wi wi-wu-rain"></i> */}
      {/* <i className="wi-wu-sleat"></i> */}

      <input
        type="text"
        placeholder="City"
        onKeyUp={fetchData}
        className="search__input"
      ></input>
    </div>
    )
}

export default Search;

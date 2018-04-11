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
        const loc = json.results[0].formatted_address;
        props.handleFetchData(lat, lng, loc);
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

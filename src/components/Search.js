import React from 'react';
import config from '../../config.json';

const Search = (props) => {

  const fetchLocationData = (e) => {
      if (e.key === 'Enter') {
        const searchTerm = e.target.value.trim().replace(/ /g,"_");
        props.handleFetchLocationData(searchTerm)
        e.target.value = '';
      }
  }

  return (
    <div className="search">
      <input
        type="text"
        placeholder="City"
        onKeyUp={fetchLocationData}
        className="search__input"
      ></input>
    </div>
    )
}

export default Search;

import React from 'react';
import config from '../../config.json';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');

const Search = (props) => {

  const fetchLocationData = (e) => {
      if (e.key === 'Enter') {
        const searchTerm = e.target.value.trim().replace(/ /g,"_");
        props.handleFetchLocationData(searchTerm)
        e.target.value = '';
        socket.emit('sendMessage', 'this is working')
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

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
// const config = require('./config.json');

const WEATHER_KEY = process.env.WEATHER_API_KEY || config.WEATHER_API_KEY;
const GEOCODE_KEY = process.env.GEOCODE_API_KEY || config.GEOCODE_API_KEY;
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/dist'));

io.on('connection', client => {

  client.on('sendLocation', location => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${GEOCODE_KEY}`;

    axios.get(url)
      .then(response => {
        if (response.data.status === 'ZERO_RESULTS') {
          io.emit('error',  {
            status: true,
            message: 'i can\'t seem to find this location... is it spelled correctly?',
          });
        } else {
          io.emit('error',  {
            status: false,
            message: '',
          });

          const lat = response.data.results[0].geometry.location.lat;
          const lng = response.data.results[0].geometry.location.lng;
          const loc = response.data.results[0].formatted_address;

          io.emit('setLocation', loc);
          handleFetchWeatherData(lat, lng, loc);
        }
      })
      .catch(error => {
        io.emit('error',  {
          status: true,
          message: 'something went wrong with the geocoding API',
        });
      });
  });
});

handleFetchWeatherData = ( lat, lng, loc ) => {
  const url = `https://api.darksky.net/forecast/${WEATHER_KEY}/${lat},${lng}?exclude=minutely&units=us`;

    axios.get(url)
      .then(response => {
        if (response.data.code === 400) {
          io.emit('error',  {
            status: true,
            message: 'Uh oh, I couldn\'t find this location.',
          });
        } else { io.emit('weatherJSON', response.data); }
      })
      .catch(error => {
        io.emit('error',  {
          status: true,
          message: 'something went wrong with the weather API',
        });
      });
};


server.listen(port);

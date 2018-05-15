const express = require('express');
const socket = require('socket.io');
// const io = require('socket.io')();


const app = express();
const server = app.listen(3000, () => {
  console.log('server is up');
});

app.use(express.static('dist'));
const io = socket(server);

// io.on('connection', socket => {
//   socket.on('sendMessage', data => {
//     const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${data}&key=AIzaSyCo7ttO8FBnUNXonnzWcSLBMGsAdOHJi4o`;
//
//     axios.get(url)
//       .then(res => io.emit('upper', res.data.results[0].formatted_address))
//       // .then(json => {
//       //   // io.emit('upper', res.data.results[0].formatted_address)
//       //   console.log(json);
//       // })
//       .catch('something went wrong');
//   })
// })
io.on('connection', client => {
  console.log('connected');
  client.on('sendMessage', data => {
    console.log(data);
  })
})
// io.listen(3000);

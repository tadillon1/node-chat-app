const path = require('path');         //node tool to configure the PATH to our file locations
const http = require('http');         //node http server
const express = require('express');   //node express web server
const socketIO = require('socket.io'); //node socket IO tool for event handling

const publicPath = path.join(__dirname, '../public');  //path to the 'public' folder for any POSIX OS
const port = process.env.PORT || 3000;    //Web Server listening on heroku port or PORT 3000 for local
var app = express();
var server = http.createServer(app);    //server is the 'http' server
var io = socketIO(server);              //io is the web sockets server

app.use(express.static(publicPath));    //Point express to the public folder containing index.html

io.on('connection', (socket) => {     //event listener (listen for an event) in this case it is connection
  console.log('New user connected');

  socket.emit('newMessage', {         //EMIT a 'newMessage' socket type with the object containing from, text, and createAt
    from: 'John',
    text: 'See you then.',
    createdAt: 123123
  });

  socket.on('createMessage', (newMessage) => {  // CUSTOM EVEN LISTENER for createMessage event
    console.log('New Message Recieved', newMessage);
  });

  socket.on('disconnect', () => {   //event listener for disconnect.  I.E. the client drops off...
    console.log('User was disconnected');
  });
});

//------------------------------------START SERVER------------------------------------------

server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};

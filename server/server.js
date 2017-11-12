const path = require('path');         //node tool to configure the PATH to our file locations
const http = require('http');         //node http server
const express = require('express');   //node express web server
const socketIO = require('socket.io'); //node socket IO tool for event handling

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');  //path to the 'public' folder for any POSIX OS
const port = process.env.PORT || 3000;    //Web Server listening on heroku port or PORT 3000 for local
var app = express();
var server = http.createServer(app);    //server is the 'http' server
var io = socketIO(server);              //io is the web sockets server

app.use(express.static(publicPath));    //Point express to the public folder containing index.html

io.on('connection', (socket) => {     //event listener (listen for an event) in this case it is connection
  // console.log('New user connected');


  //Send message to newly joined user- Welcome to the chat app
   socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  //broadast to all users except the newly joined user"New User joined" and createdAt
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));



  socket.on('createMessage', (message, callback) => {  // CUSTOM EVEN LISTENER for createMessage event
    console.log('New Message Recieved', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server.');  //Acknolodge we got the request.  This text is sent to the client as data to the emitter call back function
    // socket.broadcast.emit('newMessage', { //broadcast the message to everyone EXCEPT the user who sent it
    //     from: message.from,
    //     text: message.text,
    //     createdAt: new Date().getTime()
    //});
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

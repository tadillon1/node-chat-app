const path = require('path');         //node tool to configure the PATH to our file locations
const http = require('http');         //node http server
const express = require('express');   //node express web server
const socketIO = require('socket.io'); //node socket IO tool for event handling


const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');  //path to the 'public' folder for any POSIX OS
const port = process.env.PORT || 3000;    //Web Server listening on heroku port or PORT 3000 for local
var app = express();
var server = http.createServer(app);    //server is the 'http' server
var io = socketIO(server);              //io is the web sockets server
var users = new Users();                //variable to add/remove/manipulate users' data

app.use(express.static(publicPath));    //Point express to the public folder containing index.html

io.on('connection', (socket) => {     //event listener (listen for an event) in this case it is connection
  // console.log('New user connected');




  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room are required.');
    }

    socket.join(params.room);     //broadcast messages to members of specific rooms.  MUST be a STRING value
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    //socket.leave(params.room);  //This is used to have a room member leave the room.

    //io.emit - used to emit to every connected user
    //io.to(params.room).emit -- used to emit message to everyone connected to a room

    //socket.broadcast.emit - used to emit messages to the socket server except the sender
    //socket.broadcast.to(params.room).emit -- used to emit messages to everyone in a room except the sender

    //socket.emit - used to emit messages to one user

    //Send message to newly joined user- Welcome to the chat app
     socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    //broadast to all users except the newly joined user"New User joined" and createdAt
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));


    callback();
  });

  socket.on('createMessage', (message, callback) => {  // CUSTOM EVEN LISTENER for createMessage event
    console.log('New Message Recieved', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();  //Acknolodge we got the request.  This text is sent to the client as data to the emitter call back function
  });

  socket.on('createLocationMessage', (coords) => {   //CUSTOM EVENT LISTENER for createLocationMessage event
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {   //event listener for disconnect.  I.E. the client drops off...
    var user = users.removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});

//------------------------------------START SERVER------------------------------------------

server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};

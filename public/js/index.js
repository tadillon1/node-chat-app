<!--initiating a request from the client to the server and keep the connection open-->
var socket = io();

<!-- Initiate a persistent connection to the server -->
socket.on('connect', function () {
  console.log('Connected to server');

  <!-- Custom emit connection to the server for a new message -->
  socket.emit('createMessage', {
    from: 'Andrew',
    text: 'Yup, that works for me.'
  });
});

<!-- Listen for dropped server -->
socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

<!-- CUSTOM LISTENER for new messages from the server -->
socket.on('newMessage', function (message) {
  console.log('Recieved a new Message', message);
});

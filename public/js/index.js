<!--initiating a request from the client to the server and keep the connection open-->
var socket = io();

function scrollToBottom() {
  <!--//Selectors -->
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  <!-- //Heights -->
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight') ;
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);  //scrollTop is a jQuery method for setting the scrollTop value
  }
};

<!-- Initiate a persistent connection to the server -->
socket.on('connect', function () {
  console.log('Connected to server');
});

<!-- Listen for dropped server -->
socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

<!-- CUSTOM LISTENER for new messages from the server -->
socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();
});

<!-- CUSTOM LISTENER for new locationMessages response from the server -->
socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();
});


jQuery('#message-form').on('submit', function (e) {   //Click listener for SUBMIT button
  e.preventDefault();     //prevent default behavior for form submissions to be a query in the form

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {        //callback function for message receipt from the SERVER
    messageTextbox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {     //Click listener for the locationButton.  Function is called when someone clicks the button
  if(!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');  //disables the location button until the google api responds and displays message while you wait.

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');  //removed the disabled attribute of the button and reset the text on the button
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');  //removed the disabled attribute of the button and reset the text on the button
    alert('Unable to fetch location.');
  });
});

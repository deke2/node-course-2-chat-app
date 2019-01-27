var socket = io(); /* This creates the socket */

// socket.on - means a listener for an event
// socket.emit - means broadcast an event to a single client
// io.emit - means broadcast an event to all clients

socket.on('connect', function() {
        console.log('Connected to server');

        // socket.emit('createMessage', {
        //         from: 'Deke',
        //         text: 'Text from the client',
        //         createdAt: 123
        // });
});

socket.on('newMessage', function(message) {
        console.log('newMessage:', message);
        var li = jQuery('<li></li>');
        li.text(`${message.from}: ${message.text}`);

        jQuery('#messages').append(li);
});


socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target ="_blank">My current location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

socket.on('disconnect', function() {
        console.log('Disconnected from server');
});

jQuery('#message-form').on('submit', function (e) {
        e.preventDefault(); // This avoids refreshing the page.

        socket.emit('createMessage', {
                from: 'User',
                text: jQuery('[name=message').val()
        }, function () {

        });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location.');
  });
});

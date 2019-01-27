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
        var formattedTime = moment(message.createdAt).format('h:mm a');
        var li = jQuery('<li></li>');
        li.text(`${message.from} ${formattedTime}: ${message.text}`);

        jQuery('#messages').append(li);
});


socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  var a = jQuery('<a target ="_blank">My current location</a>');

  li.text(`${message.from} ${formattedTime}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

socket.on('disconnect', function() {
        console.log('Disconnected from server');
});

jQuery('#message-form').on('submit', function (e) {
        e.preventDefault(); // This avoids refreshing the page.

        var messageTextBox = jQuery('[name=message');

        socket.emit('createMessage', {
                from: 'User',
                text: messageTextBox.val()
        }, function () {
            messageTextBox.val(''); // Clear the area after the server receives the message.
        });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...'); // Disable button and change text

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location'); // re-enable the button and change text
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location.');
    locationButton.removeAttr('disabled').text('Send location'); // re-enable the button and change text
  });
});

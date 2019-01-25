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

socket.on('disconnect', function() {
        console.log('Disconnected from server');
});

socket.emit('createMessage', {
        from: 'Frank',
        text: 'Hi'
}, function (data) {
        console.log('Got it', data);
});

jQuery('#message-form').on('submit', function (e) {
        e.preventDefault(); // This avoids refreshing the page.

        socket.emit('createMessage', {
                from: 'User',
                text: jQuery('[name=message').val()
        }, function () {

        });
});

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

socket.on('newMessage', function(text) {
        console.log('newMessage:', text);
});

socket.on('disconnect', function() {
        console.log('Disconnected from server');
});

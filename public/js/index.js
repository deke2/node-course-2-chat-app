var socket = io(); /* This creates the socket */

// socket.on - means a listener for an event
// socket.emit - means create an event

socket.on('connect', function() {
        console.log('Connected to server');

        socket.emit('createMessage', {
                from: 'Deke',
                text: 'Text from the client',
                createdAt: 123
        });

});

socket.on('newMessage', function(text) {
        console.log('newMessage:', text);
});

socket.on('disconnect', function() {
        console.log('Disconnected from server');
});

// socket.on('newEmail', function(email) {
//          console.log('New email', email);
// });


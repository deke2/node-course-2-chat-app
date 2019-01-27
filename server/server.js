const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express(); // This is the app
var server = http.createServer(app);
var io = socketIO(server);  // Create the web socket

app.use(express.static(publicPath)); // This is the middleware

// socket.emit <- sends to a single client
// io.emit <- sends to ALL clients
// socket.broadcast.emit <- sends to ALL clients except one

io.on('connection', (socket) => {
        console.log('New user connected');

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat!'));

        socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined'));

        socket.on('createMessage', (message, callback) => {
                console.log('CreateMessage:', message);
                io.emit('newMessage', generateMessage(message.from, message.text));
                callback('This is from the server.');
        });

        socket.on('createLocationMessage', (coords) => {
          io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
        });

        socket.on('disconnect', () => {
                console.log('User was disconnected from server');
        });
});  // Register an event listener.  This socket is unique to the client

server.listen(port, () => {
        console.log(`Server is up on port: ${port}`);
});

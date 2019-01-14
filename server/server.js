const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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

        socket.emit('newMessage', {
           from: 'admin',
           text: 'Welcome to the chat',
           createAt: new Date().getTime()    
        });

        socket.broadcast.emit('newMessage', {
                from: 'admin',
                text: 'Yarko has joined the chat.',
                createAt: new Date().getTime()    
             });

        socket.on('createMessage', (message) => {
                console.log('CreateMessage:', message);
                io.emit('newMessage', {
                        from: message.from,
                        text: message.text,
                        createdAt: new Date().getTime() 
                });
                // socket.broadcast.emit('newMessage', {
                //         from: message.from,
                //         text: message.text,
                //         createdAt: new Date().getTime() 
                // });
        });

        socket.on('disconnect', () => {
                console.log('User was disconnected from server');
        });
});  // Register an event listener.  This socket is unique to the client

server.listen(port, () => {
        console.log(`Server is up on port: ${port}`);
});

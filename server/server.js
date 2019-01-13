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

io.on('connection', (socket) => {
        console.log('New user connected');

        socket.on('disconnect', () => {
                console.log('User was disconnected from server');
        });
});  // Register an event listener.  This socket is unique to the client

server.listen(port, () => {
        console.log(`Server is up on port: ${port}`);
});

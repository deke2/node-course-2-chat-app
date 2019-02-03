const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validations');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express(); // This is the app
var server = http.createServer(app);
var io = socketIO(server);  // Create the web socket
var users = new Users();

app.use(express.static(publicPath)); // This is the middleware

// socket.emit <- sends to a single client
// io.emit <- sends to ALL clients
// socket.broadcast.emit <- sends to ALL clients except one
// io.emit -> io.to('text).emit <- this sends the event to everyone in here
// socket.broadcast.to('text').emit <- Same as broadcast.emit except restricted to 'text' (room / channel)


io.on('connection', (socket) => {
        console.log('New user connected');

        socket.on('join', (params, callback) => {
            if (!isRealString(params.name) || !isRealString(params.room)) {
                return callback('Name and room name are required.');
            }
            socket.join(params.room);
            users.removeUser(socket.id);
            users.addUser(socket.id, params.name, params.room);
            //socket.leave('text'); This will kick you out of the room

            io.to(params.room).emit('updateUserList', users.getUserList(params.room));
            socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat!'));

            socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
    
            callback();
        });

        socket.on('createMessage', (message, callback) => {
                console.log('CreateMessage:', message);
                io.emit('newMessage', generateMessage(message.from, message.text));
                callback();
        });

        socket.on('createLocationMessage', (coords) => {
          io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
        });

        socket.on('disconnect', () => {
            var user = users.removeUser(socket.id);

            if (user) {
                io.to(user.room).emit('updateUserList', users.getUserList(user.room));
                io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
            }
        });
});  // Register an event listener.  This socket is unique to the client

server.listen(port, () => {
        console.log(`Server is up on port: ${port}`);
});

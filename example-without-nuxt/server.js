let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let port = 5000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

http.listen(port, () => {
  console.log('Listening on port : ' + port);
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('connections', Object.keys(io.sockets.connected).length);

  socket.on('disconnect', () => {
    console.log("A user disconnected");
  });

  socket.on('chat-message', (data) => {
    socket.broadcast.emit('chat-message', (data));
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', (data));
  });

  socket.on('stopTyping', () => {
    socket.broadcast.emit('stopTyping');
  });

  socket.on('joined', (data) => {
    socket.broadcast.emit('joined', (data));
  });

  socket.on('leave', (data) => {
    socket.broadcast.emit('leave', (data));
  });

});

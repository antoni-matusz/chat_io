/**
 * Zależności modułu.
 */

var express = require('express')
  , sio = require('socket.io')
  , http = require('http')

/**
 * Utwórz aplikację.
 */

app = express();

app.use(express.bodyParser());
app.use(express.static('public'));

/**
 * Serwer.
 */

var server = http.createServer(app);

/**
 * Nasłuchuj.
 */

server.listen(3000);

var io = sio.listen(server);

io.sockets.on('connection', function (socket) {
  socket.on('join', function (name) {
    socket.nickname = name;
    socket.broadcast.emit('announcement', name + ' wchodzi na czat.');
  });

  socket.on('text', function (msg, fn) {
    socket.broadcast.emit('text', socket.nickname, msg);
    fn(Date.now());
  });
});

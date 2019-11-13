const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.render('index.ejs');
});

io.sockets.on('connection', function(socket) {
    var a, n, mb, kc, mc, k;
    socket.on('username', function(sen) {
        var username = sen[0];
        a = sen[1];
        n = sen[2];
        mb = sen[3];
        kc = 19;
        var exp = Math.pow(a, kc);
        mc = exp % n;
        socket.username = username;
        exp = Math.pow(mb, kc);
        k = exp % n;
        io.emit('share_cred', mc);
        io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })

    socket.on('chat_message', function(message) {
        var chat = ['<strong>' + socket.username + '</strong>: ', message];
        console.log(message);
        io.emit('chat_message', chat);
    });

});

const server = http.listen(8080, function() {
    console.log('listening on *:8080');
});
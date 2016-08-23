var express = require('express');
var app = express();
var server = require('http').createServer(app);

var    io = require('socket.io').listen(server);


app.use(express.static(__dirname + '/public'));

var port = process.env.port || 9191

server.listen(port);






console.log("http://localhost:9191 running");

app.get("/", function (req, res) {
    res.sendfile(".public/index.html");
});

io.sockets.on('connection', function (socket) {    
    console.log('client connected...');
    socket.broadcast.emit("Hello Client");

    socket.on('join', function (data) {
        console.log(data);
        io.sockets.emit('messages','hello from server');
    });
    //socket.on('loggedinStudents', function (data) {
    //    io.sockets.emit('loggedinStudents', data);
    //});
});

//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello World\n');
//}).listen(port);


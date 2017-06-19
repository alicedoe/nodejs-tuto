var http = require('http');
var fs = require('fs');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function (req, res) {
    fs.readFile('./chat.html', 'utf-8', function (error, content) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket, pseudo) {
    
    socket.broadcast.emit('connexion', 'Un autre client vient de se connecter ! ');
    // Dès qu'on nous donne un pseudo, on le stocke en variable de session
    socket.on('petit_nouveau', function (socket, pseudo) {
        socket.pseudo = pseudo;
        io.sockets.emit('connexion', pseudo+' vient de se connecter ! ');
    });

    // Dès qu'on reçoit un "message" (clic sur le bouton), on le note dans la console
    socket.on('message', function (pseudo) {
        // On récupère le pseudo de celui qui a cliqué dans les variables de session
        io.sockets.emit('message', pseudo);
});

});





server.listen(8080);
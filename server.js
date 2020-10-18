const http = require('http');
const port = process.env.PORT || 3000;
const app = require("./app");

const server = http.createServer(app);

server.listen(port);

server.on('connection', function(socket) {
    socket.setTimeout(180000); 
  });

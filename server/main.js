var server = require('./server.js');

var PORT = process.env.PORT || 8080;

server.listen(PORT, function () {
  console.log('Listening on port', PORT);
});

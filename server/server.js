var express = require('express');
var path = require('path');

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://powerful-bayou-31061.herokuapp.com");
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('/', function (req, res) {
  res.sendFile('../dist/index.html', { root: __dirname });
});

app.listen(process.env.PORT || 5000, function () {
  console.log('Listinging on port 5000');
});

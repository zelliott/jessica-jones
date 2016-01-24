var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.resolve(__dirname, '../dist')));
app.get('/', function (req, res) {
  res.sendFile('../dist/index.html', { root: __dirname });
});

app.listen(3000, function () {
  console.log('Listinging on port 3000');
});

var express = require('express');
var path = require('path');

var router = express.Router();

router.route('/').get(function (req, res) {
  res.sendFile('../dist/index.html', { root: __dirname })
})

module.exports = router;

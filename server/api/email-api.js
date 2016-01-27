var express = require('express');
var morgan = require('morgan');
var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);

var router = express.Router();
var BASE_URL = 'https://powerful-bayou-31061.herokuapp.com/#!/verify/';

router.use(morgan('dev'));

router.route('/email')
  .post(function (req, res) {

    var message = '<p>Thanks for signing up for Penn Listings.  To verify your email address, follow the link below.</p>' +
      '<a href="' + BASE_URL + req.body.id + '">Verify your email address</a>';

    var email = new sendgrid.Email({
      to: req.body.to,
      from: 'no-reply@jessica-jones.com',
      subject: 'Thanks for signing up',
      html: message
    });

    sendgrid.send(email, function (error, json) {
      if (error) {
        console.log(error);
        res.status(400).send(error);
      } else {
        res.json(json);
      }
    });
  });

module.exports = router;

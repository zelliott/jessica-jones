var express = require('express');
var postmark = require('postmark')(process.env.POSTMARK_API_TOKEN);

var router = express.Router();
// var BASE_URL = 'https://powerful-bayou-31061.herokuapp.com/verify/';

router.route('/email')
  .post(function (req, res) {

    // let message = '<p>Thanks for joining this listings network.  Click on the below link to verify your account.</p><a href=\"' + BASE_URL + id + '\">' + BASE_URL + id + '</a>'

    postmark.send({
      'From': 'leonard@bigbangtheory.com',
      'To': 'sheldon@bigbangtheory.com',
      'Subject': 'Hello from Postmark',
      'TextBody': 'Hello!',
      'Tag': 'big-bang'
    }, (error) => {
      if (error) {
        res.status(400).send('Unable to send via postmark: ' + error.message);
      } else {
        res.json('Sent to postmark for delivery');
      }
    })
  })

  .get(function (req, res) {
    res.send('Test');
  })

module.exports = router;

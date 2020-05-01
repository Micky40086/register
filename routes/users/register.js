var express = require('express');
var router = express.Router();

import * as userHelper from '../../helpers/userHelper.js';

router.post('/', function(req, res, next) {
  try {
    if (userHelper.userIsValidate(req.body.user)) {
      // createUser to Database
      // call mail api (sendgird, smtp)
      // create coupon with userId
      // regenarator auth token
      token = "user regenarate token";
    }
    res.send({token});
  } catch (errorMessage) {
    res.send({error: errorMessage});
  };
});

module.exports = router;

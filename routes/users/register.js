var express = require('express');
var router = express.Router();
import axios from 'axios';

import * as userHelper from '../../helpers/userHelper.js';

router.post('/', function(req, res, next) {
  try {
    if (userHelper.userIsValidate(req.body.user)) {
      // createUser to Database
      // call mail api (sendgird, smtp)
      // create coupon with userId
      token = userHelper.regeneratorUserAuthToken(req.body.user.email);
    }
    res.send({token});
  } catch (errorMessage) {
    res.send({error: errorMessage});
  };
});

router.post('/google', function(req, res, next) {
  try {
    const accessToken = req.query.accessToken;
    // Get userInfo with accessToken
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`).then(profileRes => {
      if (userHelper.userIsExist(profileRes.email)) {
        // regenarator auth token
        token = userHelper.regeneratorUserAuthToken(profileRes.email);
        res.send({token});
      } else {
        // createUser to Database
        // call mail api (sendgird, smtp)
        // create coupon with userId
        token = userHelper.regeneratorUserAuthToken(profileRes.email);
        res.send({token});
      }
    }).catch(error => {
      res.send({error: error.response.statusText});
    })
  } catch (errorMessage) {
    res.send({error: errorMessage});
  };
});

module.exports = router;

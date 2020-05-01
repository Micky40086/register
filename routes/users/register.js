var express = require('express');
var router = express.Router();

import * as userHelper from '../../helpers/userHelper';
import * as googleApi from '../../services/google';
import * as facebookApi from '../../services/facebook';

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

router.get('/google', function(req, res, next) {
  const accessToken = req.query.accessToken;

  googleApi.getUserInfo(accessToken).then(profileRes => {
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
  }).catch(errorMessage => {
    res.send({error: errorMessage});
  })
});

router.get('/facebook', function(req, res, next) {
  const code = req.query.code;

  facebookApi.getAccessToken(code).then(tokenRes => {
    if (tokenRes.access_token) {
      facebookApi.getUserInfo(tokenRes.access_token).then(profileRes => {
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
      })
    }
  }).catch(errorMessage => {
    res.send({error: errorMessage});
  })
});

module.exports = router;

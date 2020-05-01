var express = require('express');
var router = express.Router();

import * as userHelper from '../../helpers/userHelper';
import * as googleApi from '../../services/google';
import * as facebookApi from '../../services/facebook';
import * as userService from '../../services/userService';

router.post('/', async function(req, res, next) {
  try {
    // userIsValidate throw error if false
    if (userHelper.userIsValidate(req.body.user)) {
      const user = await userService.createUser(req.body.user);
      const token = await userService.generateUserAuthToken(user.email);
      res.send({token});
    }
  } catch (errorMessage) {
    res.send({error: errorMessage});
  };
});

router.get('/google', function(req, res, next) {
  const accessToken = req.query.accessToken;
  let token = "";

  googleApi.getUserInfo(accessToken).then(async profileRes => {
    if (userHelper.userIsExist(profileRes.email)) {
      token = await userService.generateUserAuthToken(profileRes.email);
    } else {
      token = await userService.createUser(req.body.user);
    }
    res.send({token});
  }).catch(errorMessage => {
    res.send({error: errorMessage});
  })
});

router.get('/facebook', async function(req, res, next) {
  const code = req.query.code;
  let token = "";

  facebookApi.getAccessToken(code).then(tokenRes => {
    if (tokenRes.access_token) {
      facebookApi.getUserInfo(tokenRes.access_token).then(async profileRes => {
        if (userHelper.userIsExist(profileRes.email)) {
          token = await userService.generateUserAuthToken(profileRes.email);
        } else {
          token = await userService.createUser(req.body.user);
        }
        res.send({token});
      })
    }
  }).catch(errorMessage => {
    res.send({error: errorMessage});
  })
});

module.exports = router;

import axios from 'axios';

import * as facebookConfig from '../config/facebook';

const _get = (uri, data = {}, options = {}) => {
  return axios.get(uri, {params: data, ...options}).catch(error => {
    throw error.response.statusText
  })
};

export const getAccessToken = (code) => {
  return _get('https://www.googleapis.com/oauth2/v1/userinfo', {
    redirect_uri: 'http://localhost:3000/users/register/facebook',
    client_id: facebookConfig.facebookId,
    client_secret: facebookConfig.facebookSecret,
    code
  })
};

export const getUserInfo = (accessToken) => {
  return _get('https://graph.facebook.com/me', {
    access_token: accessToken,
    fields: 'id,name,email'
  })
};
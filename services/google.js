import axios from 'axios';

const _get = (uri, data = {}, options = {}) => {
  return axios.get(uri, {params: data, ...options}).catch(error => {
    throw error.response.statusText
  })
};

export const getUserInfo = (accessToken) => {
  return _get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`)
};


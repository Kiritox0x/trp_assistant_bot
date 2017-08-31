// file: src/util/Auth.js
import axios from 'axios';
import syncRequest from 'sync-request';

import store from '../store';
import * as actions from '../actions'
import * as API from '../config/Api';

export const login = ({username, password}) => {
  return axios
    .post(API.URL + API.LOGIN, {
      username,
      password
    })
    .then(function (response) {
      store.dispatch(actions.setToken({
        token: response.data.token,
        isLogined: true
      }));
    })
    .catch(function (error) {
      throw error;
    });
};


export const syncIsLogined = () => {
  const { token, isLogined } = store.getState().token;
  if (!token) return false;
  if (isLogined) return true;
  return false;// eslint-disable-next-line
  const res = syncRequest(
    'POST', API.URL + API.CHECKTOKEN, {
    json: { token }
  });
  if (res.status === 200) {
    const body = JSON.parse(res.body);
    store.dispatch(actions.setToken({
      token: body.token,
      isLogined: true
    }));
    return true;
  }
  return false;
};


// file: src/util/Auth.js
import axios from 'axios';
import syncRequest from 'sync-request';
import store from '../store';
import { setToken } from '../actions'
import { URL, LOGIN, CHECKTOKEN } from '../config/Api';

export const login = ({username, password}) => {
  return axios
    .post(URL + LOGIN, {
      username,
      password
    })
    .then(function (response) {
      store.dispatch(setToken({
        token: response.data.token,
        isLogined: true
      }));
      axios.defaults.headers.common['Authorization'] = "Token " + response.data.token;
      console.log('111111111' + axios.defaults.headers.common['Authorization']);
    })
    .catch(function (error) {
      throw error;
    });
}


export const syncIsLogined = () => {
  return true;
  const { token, isLogined } = store.getState().token;
  if (!token) return false;
  if (isLogined) return true;
  const res = syncRequest(
    'POST', URL + CHECKTOKEN, {
    json: { token }
  });
  if (res.statusCode === 200) {
    const body = JSON.parse(res.body);
    store.dispatch(setToken({
      token: body.token,
      isLogined: true
    }));
    return true;
  }
  return false;
  // return checkIsLogined(token);
}

const checkIsLogined = async (token) => {
  const res = await new Promise((resolve, reject) => {
    axios
      .post(URL + CHECKTOKEN, { token })
      .then((response) => {
        store.dispatch(setToken({
          token: response.data.token,
          isLogined: true
        }));
        resolve(true);
      })
      .catch((error) => {
        resolve(false);
      });
  });
  return res;
}


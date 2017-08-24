// file: src/util/ApiClient.js
import axios from 'axios';
import store from '../store';
import { URL } from '../config/Api';

export const getList = (ENDPOINTS) => {
  var instance = axios.create({
    timeout: 1000,
    headers: {'Authorization': 'Token ' + store.getState().token.token }
  });
  return axios.get(URL + ENDPOINTS, {
    headers: {'Authorization': 'Token ' + store.getState().token.token }
  })
    .then((response) => {
      return JSON.parse(response.data);
    })
    .catch((error) => {
      return error;
    });
}

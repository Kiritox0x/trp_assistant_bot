// file: src/util/ApiClient.js
import axios from 'axios';
import store from '../store';
import { URL } from '../config/Api';

export const getList = (ENDPOINTS) => {
  return axios.get(URL + ENDPOINTS, {
    headers: {'Authorization': 'Token ' + store.getState().token.token }
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

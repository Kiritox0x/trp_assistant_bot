// file: src/util/ApiClient.js
import axios from 'axios';
import store from '../store';
import { URL } from '../config/Api';

export const getList = (ENDPOINTS) => {
  return axios.get(URL + ENDPOINTS)
    .then((response) => {
      return JSON.parse(response.data);
    })
    .catch((error) => {
      return error;
    });
}

// file: src/util/ApiClient.js
import axios from 'axios';
import store from '../store';
import { URLAPI, LIST_TEACHERS } from '../config/Api';

export const getListTeachers = () => {
  return new Promise((resolve, reject) => {
    axios.get(URLAPI + LIST_TEACHERS)
    .then((response) => {
      resolve(JSON.parse(response.data));
    })
    .catch((error) => {
      reject(error);
    });
  });
}

// file: src/util/ApiClient.js
import React from 'react';
import axios from 'axios';
import {
  Button, Glyphicon
} from 'react-bootstrap';

import store from '../store';
import * as API from '../config/Api';
import * as actions from '../actions';
import * as constants from '../config/constant';

const clickEdit = (index, type) => {
  store.dispatch(actions.select(index, type.SELECT));
  setTimeout(() => {store.dispatch(actions.toggleModal(true, type.TOGGLE_MODAL_EDIT));}, 100);
};

const clickDelete = (index, type) => {
  store.dispatch(actions.select(index, type.SELECT));
  setTimeout(() => {store.dispatch(actions.toggleModal(true, type.TOGGLE_MODAL_DELETE));}, 100);
};

const clickPreview = (index, type) => {
  store.dispatch(actions.select(index, type.SELECT));
  setTimeout(() => {store.dispatch(actions.toggleModal(true, type.TOGGLE_MODAL_PREVIEW));}, 100);
};

const clickSendmail = (index, type) => {
  store.dispatch(actions.select(index, type.SELECT));
  setTimeout(() => {store.dispatch(actions.toggleModal(true, type.TOGGLE_MODAL_SENDMAIL));}, 100);
};

const getList = (ENDPOINTS) => {
  return axios.get(API.URL + ENDPOINTS, {
    headers: {'Authorization': 'Token ' + store.getState().token.token }
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const processData = (data, type, options = 0) => {
  return data.map((item, index) => {
    let row = {
      ...item,
      edit:     <Button bsStyle="primary" bsSize="xsmall" onClick={() => clickEdit(index, type)}>
                  <Glyphicon glyph="pencil" /> Chỉnh sửa
                </Button>,
      delete:   <Button bsStyle="danger" bsSize="xsmall" onClick={() => clickDelete(index, type)}>
                  <Glyphicon glyph="trash" /> Xóa
                </Button>
    };
    switch (options) {
      case constants.HAS_PREVIEW:
        row.preview = <Button bsStyle="success" bsSize="xsmall" onClick={() => clickPreview(index, type)}>
                        <Glyphicon glyph="search" /> Xem trước
                      </Button>
        break;
      case constants.HAS_SEND_MAIL:
        row.sendmail =  <Button bsStyle="success" bsSize="xsmall" onClick={() => clickSendmail(index, type)}>
                          <Glyphicon glyph="send" /> Gửi mail
                        </Button>
        break;
      default : break;
    }
    return row;
  });
};

export const getData = (endpoints, type, options = 0) => {
  store.dispatch(actions.set(true, type.SET_FETCHING));
  getList(endpoints)
  .then((data) => {
    const body = processData(data, type, options);
    if (type.SET_RAW_DATA) {
      store.dispatch(actions.set(data, type.SET_RAW_DATA));    
    }
    store.dispatch(actions.set(body, type.SET_BODY));
    setTimeout(() => store.dispatch(actions.set(false, type.SET_FETCHING), 100));
  })
  .catch(error => console.log(error));
};

export const addData = (ENDPOINTS, item) => {
  return fetch(`${API.URL}${ENDPOINTS}`, { 
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Token ' + store.getState().token.token,
      },
      body: JSON.stringify(item),
    })
    .then(res => res.json());
};

export const saveData = (ENDPOINTS, item) => {
  return fetch(`${API.URL}${ENDPOINTS}${item.id}/`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Token ' + store.getState().token.token,
      },
      body: JSON.stringify(item),
    })
    .then(res => res.json());
};

export const deleteData = (ENDPOINTS, id) => {
  return new Promise((resolve, reject) => {
    axios.delete(`${API.URL}${ENDPOINTS}${id}/`,{
      headers: {'Authorization': 'Token ' + store.getState().token.token }
    })
    .then(response => resolve(response))
    .catch(error => reject(error));
  });
};

export const sendCustomMail = (ENDPOINTS, item) => {
  return new Promise((resolve, reject) => {
    axios.post(`${API.URL}${ENDPOINTS}`, item, {
      headers: {'Authorization': 'Token ' + store.getState().token.token }
    })
    .then(response => resolve(response))
    .catch(error => reject(error));
  });
};

// export const saveData = (ENDPOINTS, item) => {
//   return new Promise((resolve, reject) => {
//     axios.put(`${API.URL}${ENDPOINTS}${item.id}/`, item, {
//       headers: {'Authorization': 'Token ' + store.getState().token.token }
//     })
//     .then(response => resolve(response))
//     .catch(error => reject(error));
//   });
// };

// export const deleteData = (ENDPOINTS, id) => {
//   return new Promise((resolve, reject) => {
//     axios.delete(`${API.URL}${ENDPOINTS}${id}/`,{
//       headers: {'Authorization': 'Token ' + store.getState().token.token }
//     })
//     .then(response => resolve(response))
//     .catch(error => reject(error));
//   });
// };

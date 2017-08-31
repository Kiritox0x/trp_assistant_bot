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

export const getData = (endpoints, type, options = 0) => {
  store.dispatch(actions.set(true, type.SET_FETCHING));
  getList(endpoints)
  .then((data) => {
    const body = data.map((item, index) => {
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
    store.dispatch(actions.set(body, type.SET_BODY));
    setTimeout(() => store.dispatch(actions.set(false, type.SET_FETCHING), 100));
  })
  .catch(error => console.log(error));
};

export const addData = (ENDPOINTS, item) => {
  return axios.post(`${API.URL}${ENDPOINTS}`, item, {
    headers: {'Authorization': 'Token ' + store.getState().token.token }
  })
  .then(response => response)
  .catch(error => error);
};

export const saveData = (ENDPOINTS, item) => {
  return axios.put(`${API.URL}${ENDPOINTS}${item.id}/`, item, {
    headers: {'Authorization': 'Token ' + store.getState().token.token }
  })
  .then(response => response)
  .catch(error => error);
};

export const deleteData = (ENDPOINTS, id) => {
  return axios.delete(`${API.URL}${ENDPOINTS}${id}/`,{
    headers: {'Authorization': 'Token ' + store.getState().token.token }
  })
  .then((response) => {
    return response;
  })
  .catch((error) => {
    return error;
  });
};

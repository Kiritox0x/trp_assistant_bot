// file: src/util/ApiClient.js
import React from 'react';
import axios from 'axios';
import {
  Button, Glyphicon
} from 'react-bootstrap';
import store from '../store';
import { URL } from '../config/Api';
import { select, get, set, toggleModal } from '../actions';

const getList = (ENDPOINTS) => {
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

const clickEdit = (index, type) => {
  store.dispatch(select(index, type.SELECT));
  setTimeout(() => {store.dispatch(toggleModal(true, type.TOGGLE_MODAL_EDIT));}, 100);
};

const clickDelete = (index, type) => {
  store.dispatch(select(index, type.SELECT));
  setTimeout(() => {store.dispatch(toggleModal(true, type.TOGGLE_MODAL_DELETE));}, 100);
};


const clickPreview = (index, type) => {
  store.dispatch(select(index, type.SELECT));
  setTimeout(() => {store.dispatch(toggleModal(true, type.TOGGLE_MODAL_PREVIEW));}, 100);
};

export const getData = (API, type, preview = false) => {
  store.dispatch(set(true, type.SET_FETCHING));
  getList(API)
  .then((data) => {
    let index = 0;
    const body = data.map((item) => {
      index++;
      return ! preview ? ({
        ...item,
        edit:     <Button bsStyle="primary" bsSize="xsmall" onClick={() => clickEdit(index - 1, type)}>
                    <Glyphicon glyph="pencil" /> Chỉnh sửa
                  </Button>,
        delete:   <Button bsStyle="danger" bsSize="xsmall" onClick={() => clickDelete(index - 1, type)}>
                    <Glyphicon glyph="trash" /> Xóa
                  </Button>
      }) : ({
        ...item,
        edit:     <Button bsStyle="primary" bsSize="xsmall" onClick={() => clickEdit(index - 1, type)}>
                    <Glyphicon glyph="pencil" /> Chỉnh sửa
                  </Button>,
        delete:   <Button bsStyle="danger" bsSize="xsmall" onClick={() => clickDelete(index - 1, type)}>
                    <Glyphicon glyph="trash" /> Xóa
                  </Button>,
        preview:  <Button bsStyle="success" bsSize="xsmall" onClick={() => clickPreview(index - 1, type)}>
                    <Glyphicon glyph="search" /> Xem trước
                  </Button>
      })
    });
    store.dispatch(set(body, type.SET_BODY));
    setTimeout(() => store.dispatch(set(false, type.SET_FETCHING), 100));
  })
  .catch(error => console.log(error));
};

export const deleteData = (ENDPOINTS, id) => {
  return axios.delete(`${URL}${ENDPOINTS}${id}/`,{
    headers: {'Authorization': 'Token ' + store.getState().token.token }
  })
  .then((response) => {
    return response;
  })
  .catch((error) => {
    return error;
  });
};

// file: src/actions/index.js
import * as actionType from './types';

export const setToken = (data) => {
  return {
    type: actionType.SET_TOKEN,
    data
  }
};

export const unsetToken = () => {
  return {
    type: actionType.SET_TOKEN,
    data: {
      token: '',
      isLogined: false
    }
  }
};

export const set = (data, type) => {
  return {
    type,
    data: data
  }
};

export const select = (item, type) => {
  return {
    type,
    data: item
  }
};

export const toggleModal = (toggle, type) => {
  return {
    type,
    data: toggle
  }
};

export const addRawData = (item, type) => {
  return {
    type,
    data: item
  }
};

export const updateRawData = (item, type) => {
  return {
    type,
    data: item
  }
};

export const deleteRawData = (id, type) => {
  return {
    type,
    data: id
  }
};

export const processRawData = (type) => {
  return {
    type
  }
};





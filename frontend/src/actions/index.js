// file: src/actions/index.js
import * as actionType from './types';

export const setToken = (data) => {
  return {
    type: actionType.SET_TOKEN,
    data
  }
}

export const unsetToken = () => {
  return {
    type: actionType.SET_TOKEN,
    data: {
      token: null,
      isLogined: false
    }
  }
}

export const select = (classroom, type) => {
  return {
    type,
    data: classroom
  }
}

export const toggleModalEdit = (toggle, type) => {
  return {
    type,
    data: toggle
  }
}
export const toggleModalDelete = (toggle, type) => {
  return {
    type,
    data: toggle
  }
}






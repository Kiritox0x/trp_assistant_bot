// file: src/reducers/classroom.js
import { CLASSROOM } from '../actions/types';
import InitialState from './InitialSate';

import * as ApiClient from '../util/ApiClient';
import * as constants from '../config/constant';

const classroomInitialState = new InitialState();
classroomInitialState.showModalSendmail = false;
classroomInitialState.rawData = [];
export default (state = classroomInitialState, action) => {
  switch(action.type) {
    case CLASSROOM.SELECT:
      return {...state, selected: state.allItems[action.data]};
    case CLASSROOM.SET_RAW_DATA:
      return {...state, rawData: action.data};
    case CLASSROOM.ADD_RAW_DATA:
      return {...state, rawData: [...state.rawData, action.data]};
    case CLASSROOM.UPDATE_RAW_DATA:
      return {
        ...state, 
        rawData: state.rawData.map((item) => {
          if (item.id === action.data.id) {
            item = action.data;
          }
          return item;
        })
      };
    case CLASSROOM.DELETE_ITEM_RAW_DATA:
      return {
        ...state, 
        rawData: state.rawData.filter((item) => item.id !== action.data)
      };
    case CLASSROOM.PROCESS_RAW_DATA:
      return {
        ...state, 
        allItems: ApiClient.processData(state.rawData, CLASSROOM, constants.HAS_SEND_MAIL)
      };
    case CLASSROOM.SET_BODY:
      return {...state, allItems: action.data};
    case CLASSROOM.SET_FETCHING:
      return {...state, isFetching: action.data};
    case CLASSROOM.TOGGLE_MODAL_ADD:
      return {...state, showModalAdd: action.data};
    case CLASSROOM.TOGGLE_MODAL_EDIT:
      return {...state, showModalEdit: action.data};
    case CLASSROOM.TOGGLE_MODAL_DELETE:
      return {...state, showModalDelete: action.data};
    case CLASSROOM.TOGGLE_MODAL_SENDMAIL:
      return {...state, showModalSendmail: action.data};
    default:
      return state;
  }
}

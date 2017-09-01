// file: src/reducers/classroom.js
import { CLASSROOM } from '../actions/types';
import InitialState from './InitialSate';

const classroomInitialState = new InitialState();
classroomInitialState.showModalSendmail = false;
export default (state = classroomInitialState, action) => {
  switch(action.type) {
    case CLASSROOM.SELECT:
      return {...state, selected: state.allItems[action.data]};
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

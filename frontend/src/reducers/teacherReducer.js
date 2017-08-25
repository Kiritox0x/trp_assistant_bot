// file: src/reducers/classroom.js
import * as actionType from '../actions/types';
import InitialState from './InitialSate';

// const teacherInitialState = {
//   allTeachers: [],
//   selected: {},
//   showModalEdit: false,
//   showModalDelete: false
// };
const teacherInitialState = new InitialState();
export default (state = teacherInitialState, action) => {
  switch(action.type) {
    case actionType.SELECT_TEACHER:
      return {...state, selected: action.data};
    case actionType.TOGGLE_MODAL_ADD_TEACHER:
      return {...state, showModalAdd: action.data};
    case actionType.TOGGLE_MODAL_EDIT_TEACHER:
      return {...state, showModalEdit: action.data};
    case actionType.TOGGLE_MODAL_DELETE_TEACHER:
      return {...state, showModalDelete: action.data};
    default:
      return state;
  }
}

// file: src/reducers/classroom.js
import * as actionType from '../actions/types';

const teacherInitialState = {
  allTeachers: [],
  selected: {},
  showModal: false,
  showModalDelete: false
};
export default (state = teacherInitialState, action) => {
  switch(action.type) {
    case actionType.SELECT_TEACHER:
      return {...state, selected: action.data};
    case actionType.TOGGLE_MODAL_EDIT_TEACHER:
      return {...state, showModal: action.data};
    case actionType.TOGGLE_MODAL_DELETE_TEACHER:
      return {...state, showModalDelete: action.data};
    default:
      return state;
  }
}

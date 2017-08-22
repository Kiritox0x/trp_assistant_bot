// file: src/reducers/classroom.js
import * as actionType from '../actions/types';

const classroomInitialState = {
  allClassrooms: [],
  selected: {},
  showModal: false,
  showModalDelete: false
};
export default (state = classroomInitialState, action) => {
  switch(action.type) {
    case actionType.SELECT_CLASSROOM:
      return {...state, selected: action.data};
    case actionType.TOGGLE_MODAL_EDIT_CLASSROOM:
      return {...state, showModal: action.data};
    case actionType.TOGGLE_MODAL_DELETE_CLASSROOM:
      return {...state, showModalDelete: action.data};
    default:
      return state;
  }
}

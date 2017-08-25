// file: src/reducers/classroom.js
import * as actionType from '../actions/types';
import InitialState from './InitialSate';

// const classroomInitialState = {
//   allClassrooms: [],
//   selected: {},
//   showModalEdit: false,
//   showModalDelete: false
// };
const classroomInitialState = new InitialState();
export default (state = classroomInitialState, action) => {
  switch(action.type) {
    case actionType.SELECT_CLASSROOM:
      return {...state, selected: action.data};
    case actionType.TOGGLE_MODAL_ADD_CLASSROOM:
      return {...state, showModalAdd: action.data};
    case actionType.TOGGLE_MODAL_EDIT_CLASSROOM:
      return {...state, showModalEdit: action.data};
    case actionType.TOGGLE_MODAL_DELETE_CLASSROOM:
      return {...state, showModalDelete: action.data};
    default:
      return state;
  }
}

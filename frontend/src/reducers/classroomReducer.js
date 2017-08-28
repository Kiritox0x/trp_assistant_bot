// file: src/reducers/classroom.js
import { CLASSROOM } from '../actions/types';
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
    default:
      return state;
  }
}

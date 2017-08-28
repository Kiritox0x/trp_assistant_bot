// file: src/reducers/classroom.js
import { TEACHER } from '../actions/types';
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
    case TEACHER.SELECT:
      return {...state, selected: state.allItems[action.data]};
    case TEACHER.SET_BODY:
      return {...state, allItems: action.data};
    case TEACHER.SET_FETCHING:
      return {...state, isFetching: action.data}; 
    case TEACHER.TOGGLE_MODAL_ADD:
      return {...state, showModalAdd: action.data};
    case TEACHER.TOGGLE_MODAL_EDIT:
      return {...state, showModalEdit: action.data};
    case TEACHER.TOGGLE_MODAL_DELETE:
      return {...state, showModalDelete: action.data};
    default:
      return state;
  }
}

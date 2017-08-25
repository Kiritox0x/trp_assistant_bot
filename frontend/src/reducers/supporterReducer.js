// file: src/reducers/classroom.js
import * as actionType from '../actions/types';
import InitialState from './InitialSate';

// const assistantInitialState = {
//   allAssistants: [],
//   selected: {},
//   showModalEdit: false,
//   showModalDelete: false
// };
const supporterInitialState = new InitialState();
export default (state = supporterInitialState, action) => {
  switch(action.type) {
    case actionType.SELECT_SUPPORTER:
      return {...state, selected: action.data};
    case actionType.TOGGLE_MODAL_ADD_SUPPORTER:
      return {...state, showModalAdd: action.data};
    case actionType.TOGGLE_MODAL_EDIT_SUPPORTER:
      return {...state, showModalEdit: action.data};
    case actionType.TOGGLE_MODAL_DELETE_SUPPORTER:
      return {...state, showModalDelete: action.data};
    default:
      return state;
  }
}

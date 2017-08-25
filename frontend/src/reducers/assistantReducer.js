// file: src/reducers/classroom.js
import * as actionType from '../actions/types';
import InitialState from './InitialSate';

// const assistantInitialState = {
//   allAssistants: [],
//   selected: {},
//   showModalEdit: false,
//   showModalDelete: false
// };
const assistantInitialState = new InitialState();
export default (state = assistantInitialState, action) => {
  switch(action.type) {
    case actionType.SELECT_ASSISTANT:
      return {...state, selected: action.data};
    case actionType.TOGGLE_MODAL_ADD_ASSISTANT:
      return {...state, showModalAdd: action.data};
    case actionType.TOGGLE_MODAL_EDIT_ASSISTANT:
      return {...state, showModalEdit: action.data};
    case actionType.TOGGLE_MODAL_DELETE_ASSISTANT:
      return {...state, showModalDelete: action.data};
    default:
      return state;
  }
}

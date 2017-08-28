// file: src/reducers/classroom.js
import { SUPPORTER } from '../actions/types';
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
    case SUPPORTER.SELECT:
      return {...state, selected: state.allItems[action.data]};
    case SUPPORTER.SET_BODY:
      return {...state, allItems: action.data};
    case SUPPORTER.SET_FETCHING:
      return {...state, isFetching: action.data};  
    case SUPPORTER.TOGGLE_MODAL_ADD:
      return {...state, showModalAdd: action.data};
    case SUPPORTER.TOGGLE_MODAL_EDIT:
      return {...state, showModalEdit: action.data};
    case SUPPORTER.TOGGLE_MODAL_DELETE:
      return {...state, showModalDelete: action.data};
    default:
      return state;
  }
}

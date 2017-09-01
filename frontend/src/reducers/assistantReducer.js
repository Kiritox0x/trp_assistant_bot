// file: src/reducers/classroom.js
import { ASSISTANT } from '../actions/types';
import InitialState from './InitialSate';

const assistantInitialState = new InitialState();
export default (state = assistantInitialState, action) => {
  switch(action.type) {
    case ASSISTANT.SELECT:
      return {...state, selected: state.allItems[action.data]};
    case ASSISTANT.SET_BODY:
      return {...state, allItems: action.data};
    case ASSISTANT.SET_FETCHING:
      return {...state, isFetching: action.data};
    case ASSISTANT.TOGGLE_MODAL_ADD:
      return {...state, showModalAdd: action.data};
    case ASSISTANT.TOGGLE_MODAL_EDIT:
      return {...state, showModalEdit: action.data};
    case ASSISTANT.TOGGLE_MODAL_DELETE:
      return {...state, showModalDelete: action.data};
    default:
      return state;
  }
}

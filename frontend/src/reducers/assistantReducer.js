// file: src/reducers/classroom.js
import * as actionType from '../actions/types';

const assistantInitialState = {
  allAssistants: [],
  selected: {},
  showModal: false,
  showModalDelete: false
};
export default (state = assistantInitialState, action) => {
  switch(action.type) {
    case actionType.SELECT_ASSISTANT:
      return {...state, selected: action.data};
    case actionType.TOGGLE_MODAL_EDIT_ASSISTANT:
      return {...state, showModal: action.data};
    case actionType.TOGGLE_MODAL_DELETE_ASSISTANT:
      return {...state, showModalDelete: action.data};
    default:
      return state;
  }
}

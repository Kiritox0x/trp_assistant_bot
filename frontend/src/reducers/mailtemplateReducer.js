// file: src/reducers/classroom.js
import * as actionType from '../actions/types';
import InitialState from './InitialSate';

// const assistantInitialState = {
//   allAssistants: [],
//   selected: {},
//   showModalEdit: false,
//   showModalDelete: false
// };
let mailtemplateInitialState = new InitialState();
mailtemplateInitialState.showModalPreview = false;
export default (state = mailtemplateInitialState, action) => {
  switch(action.type) {
    case actionType.SELECT_MAILTEMPLATE:
      return {...state, selected: action.data};
    case actionType.TOGGLE_MODAL_PREVIEW_MAILTEMPLATE:
      return {...state, showModalPreview: action.data};
    case actionType.TOGGLE_MODAL_ADD_MAILTEMPLATE:
      return {...state, showModalAdd: action.data};
    case actionType.TOGGLE_MODAL_EDIT_MAILTEMPLATE:
      return {...state, showModalEdit: action.data};
    case actionType.TOGGLE_MODAL_DELETE_MAILTEMPLATE:
      return {...state, showModalDelete: action.data};
    default:
      return state;
  }
}

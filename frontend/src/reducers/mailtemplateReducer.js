// file: src/reducers/classroom.js
import { MAILTEMPLATE } from '../actions/types';
import InitialState from './InitialSate';

let mailtemplateInitialState = new InitialState();
mailtemplateInitialState.showModalPreview = false;
export default (state = mailtemplateInitialState, action) => {
  switch(action.type) {
    case MAILTEMPLATE.SELECT:
      return {...state, selected: state.allItems[action.data]};
    case MAILTEMPLATE.SET_BODY:
      return {...state, allItems: action.data};
    case MAILTEMPLATE.SET_FETCHING:
      return {...state, isFetching: action.data};
    case MAILTEMPLATE.TOGGLE_MODAL_PREVIEW:
      return {...state, showModalPreview: action.data};
    case MAILTEMPLATE.TOGGLE_MODAL_ADD:
      return {...state, showModalAdd: action.data};
    case MAILTEMPLATE.TOGGLE_MODAL_EDIT:
      return {...state, showModalEdit: action.data};
    case MAILTEMPLATE.TOGGLE_MODAL_DELETE:
      return {...state, showModalDelete: action.data};
    default:
      return state;
  }
}

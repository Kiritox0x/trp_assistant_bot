// file: src/reducers/index.js
import { combineReducers } from 'redux';

import token from './tokenReducer';
import classroom from './classroomReducer';
import teacher from './teacherReducer';


const rootReducer = combineReducers({
  token,
  classroom,
  teacher
})

export default rootReducer;

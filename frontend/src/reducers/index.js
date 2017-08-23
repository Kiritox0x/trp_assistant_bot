// file: src/reducers/index.js
import { combineReducers } from 'redux';

import token from './tokenReducer';
import classroom from './classroomReducer';
import teacher from './teacherReducer';
import assistant from './assistantReducer';


const rootReducer = combineReducers({
  token,
  classroom,
  teacher,
  assistant
})

export default rootReducer;

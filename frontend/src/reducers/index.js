// file: src/reducers/index.js
import { combineReducers } from 'redux';

import token from './tokenReducer';
import classroom from './classroomReducer';
import teacher from './teacherReducer';
import assistant from './assistantReducer';
import supporter from './supporterReducer';


const rootReducer = combineReducers({
  token,
  classroom,
  teacher,
  assistant,
  supporter
})

export default rootReducer;

// file: src/reducers/index.js
import { combineReducers } from 'redux';

import token from './tokenReducer';
import classroom from './classroomReducer';
import teacher from './teacherReducer';
import assistant from './assistantReducer';
import supporter from './supporterReducer';
import mailtemplate from './mailtemplateReducer';

const rootReducer = combineReducers({
  token,
  classroom,
  teacher,
  assistant,
  supporter,
  mailtemplate
})

export default rootReducer;

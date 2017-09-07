// file: src/store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

let middleware;

if (process.env.NODE_ENV !== "production") {
  middleware = applyMiddleware(thunk, createLogger());
} else {
  middleware = applyMiddleware(thunk);
}

const store = createStore(
  rootReducer,
  middleware
);

export default store;

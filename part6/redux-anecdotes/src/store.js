import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import filterReducer from './reducers/filterReducer';
import anecdoteReducer from './reducers/anecdoteReducer';
import notificationReducer from './reducers/notificationReducer';

const reducer = combineReducers({
  filter: filterReducer,
  anecdotes: anecdoteReducer,
  notifications: notificationReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

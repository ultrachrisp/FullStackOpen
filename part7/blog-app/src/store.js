import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import blogsReducer from './reducers/blogsReducer';
import usersReducer from './reducers/usersReducer';
import notificationReducer from './reducers/notificationReducer';

const reducer = combineReducers({
  blogs: blogsReducer,
  user: usersReducer,
  notifications: notificationReducer
});

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default store;

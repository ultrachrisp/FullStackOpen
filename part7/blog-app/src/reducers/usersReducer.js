import blogService from '../services/blogs';
import loginService from '../services/login';
import { messageError } from './notificationReducer';

const usersReducer = (state = null, action) => {
  switch(action.type){
  case 'LOGIN':
    return action.data;
  case 'LOGOUT':
    return action.data;
  default:
    return state;
  }
};

export const logIn = ({ username, password }) => {
  return async dispatch => {
    try {
    const user = await loginService.login({ username, password });
    window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch({
      type: 'LOGIN',
      data: user
    });
    } catch(error) {
      dispatch(messageError(`Error logging in: ${error}`));
    }
  };
};

export const logOut = () => {
  return async dispatch => {
    try {
      window.localStorage.removeItem('loggedBlogUser');
      dispatch({
        type: 'LOGOUT',
        data: null
      });
    } catch(error) {
      dispatch(messageError(`Error logging out: ${error}`));
    }
  };
};

export const checkLogin = () => {
  return async dispatch => {
    try{
      const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
      if(loggedUserJSON){
        const user = JSON.parse(loggedUserJSON);
        blogService.setToken(user.token);
        dispatch({
          type: 'LOGIN',
          data: user
        });
      }
    } catch(error) {
      dispatch(messageError(`Error logging in: ${error}`));
    }
  };
};

export default usersReducer;

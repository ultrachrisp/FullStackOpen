import blogService from '../services/blogs';
import { messageError, messageSuccess } from './notificationReducer';

const blogsReducer = (state = [], action) => {
  switch(action.type){
  case 'VOTE':
    return state.map(elem => (elem.id !== action.data.id)? elem: { ...elem, votes : action.data.votes });;
  case 'NEW_BLOG':
    return [...state, action.data];
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.data);
  case 'INIT_BLOGS':
    return action.data;
  default:
    return state;
  }
};

export const initialiseBlogs = () => {
  return async dispatch => {
    try{
      const blogs = await blogService.getAll();
      dispatch({
        type: 'INIT_BLOGS',
        data: blogs
      });
    } catch(error) {
      dispatch(messageError(`Could not connect to database: ${error}`));
    };
  };
};

export const createBlog = (content) => {
  return async dispatch => {
    try{
      const newBlog = await blogService.create(content);
      dispatch(messageSuccess(`Successfully created ${newBlog.content}`));
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog
      });
    } catch(error) {
      dispatch(messageError(`Following error occured: ${error}`));
    }
  };
};

export const removeBlog = (content) => {
  return async dispatch => {
    try{
      await blogService.remove(content);
      dispatch(messageSuccess(`Successfully removed ${content.content}`));
      dispatch({
        type: 'REMOVE_BLOG',
        data: content
      });
    } catch(error) {
      dispatch(messageError(`Following error occured: ${error}`));
    }
  };
};

export const voteFor = (content) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.update(content);
      dispatch(messageSuccess(`Voted for ${updatedBlog.title}`));
      dispatch({
        type: 'VOTE',
        data: updatedBlog
      });
    } catch(error) {
      dispatch(messageError(`Following error occured: ${error}`));
    }
  };
};

export default blogsReducer;

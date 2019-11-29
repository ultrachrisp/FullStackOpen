// import { connect } from 'react-redux';
import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

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
      dispatch(setNotification('initial blogs loaded', 'status', 5000));
      dispatch({
        type: 'INIT_BLOGS',
        data: blogs
      });
    } catch(error) {
      dispatch(setNotification('network error', 'error', 5000));
    };
  };
};

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content);
    setNotification('new blog', 'status', 5000);
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    });
  };
};

export const removeBlog = (content) => {
  return async dispatch => {
    await blogService.remove(content);
    dispatch({
      type: 'REMOVE_BLOG',
      data: content
    });
  };
};

export const voteFor = (content) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(content);
    dispatch(setNotification('voted for', 'status', 5000));
    dispatch({
      type: 'VOTE',
      data: updatedBlog
    });
  };
};

// const mapDispatchToProps = { setNotification };
// export default connect(null, mapDispatchToProps)(blogsReducer);
export default blogsReducer;

import React from 'react';
import { connect } from 'react-redux';
import { createBlog } from '../reducers/blogsReducer';
import { useField } from '../hooks/index';
import Togglable from './Togglable';

const BlogForm = (props) => {
  const url  = useField('text');
  const title = useField('text');
  const author = useField('text');
  const blogFormRef = React.createRef();

  const addBlog = (evt) => {
    evt.preventDefault();
    blogFormRef.current.toggleVisibility();

    const blogObject = {
      content: {
        title: title.value,
        author: author.value,
        url: url.value,
        likes: 0
      }
    };

    props.createBlog(blogObject);
  };

  return (
    <Togglable buttonLabel="new blog" ref={ blogFormRef }>
      <h2>Create a Blog Entry</h2>
      <form onSubmit={ addBlog }>
        <div>
          Title
          <input { ...title }/>
        </div>
        <div>
          Author
          <input { ...author }/>
        </div>
        <div>
          Url
          <input { ...url }/>
        </div>
        <button type="submit">save</button>
      </form>
    </Togglable>
  );
};

const mapDispatchToProps = {
  createBlog
};

export default connect(
  null,
  mapDispatchToProps
)(BlogForm);

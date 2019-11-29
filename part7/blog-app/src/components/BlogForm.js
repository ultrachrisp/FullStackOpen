import React, { useState } from 'react';
import { connect } from 'react-redux';

// import { setNotification } from '../reducers/notificationReducer';
import { createBlog } from '../reducers/blogsReducer';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (evt) => setValue(evt.target.value);

  return {
    type,
    value,
    onChange
  };
};

const BlogForm = (props) => {
  const url  = useField('text');
  const title = useField('text');
  const author = useField('text');

  const addBlog = (evt) => {
    evt.preventDefault();
    // blogFormRef.current.toggleVisibility();

    const blogObject = {
      content: {
        title: title.value,
        author: author.value,
        url: url.value,
        likes: 0
      }
    };

    props.createBlog(blogObject);
    // props.setNotification( 'Blog added successfully', 'status', 5000);

    // blogService
    //   .create(blogObject)
    //   .then(date => {
    //     setBlogs(blogs.concat(date));
    //     setBlog({ title:'',author:'', url:'' });
    //     showMessage({ message: 'Blog added successfully', type:'status' });
    //   })
    //   .catch(error => {
    //     showMessage({ message: 'Could not add the blog', type:'error' });
    //   });
  };
  
  return (
    <div>
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
    </div>
  );
};

const mapDispatchToProps = {
  // setNotification,
  createBlog
};

export default connect(
  null,
  mapDispatchToProps
)(BlogForm);

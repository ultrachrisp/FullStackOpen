import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Blog from './Blog';
import BlogForm from './BlogForm';

import { initialiseBlogs, removeBlog, voteFor } from '../reducers/blogsReducer';

const BlogList = (props) => {
  useEffect(() => {
    props.initialiseBlogs();
  },[]);

  const handleDelete = (evt) => {
    if(window.confirm('Remove blog')) {
      props.removeBlog(evt.target.name);
    }
  };

  const handleLike = (evt) => {
    const blog = props.blogs.find(elem => elem.id === evt.target.name);
    blog.likes++;

    props.voteFor(blog);
  };

  return (
    <>
      <BlogForm />
      <h2>Blogs</h2>
      {props.sortedByLikes.map(blog => 
        <div>
          <Link to={`blogs/${blog.id}`}>{ blog.title }</Link>
        </div> 
                              )}

    </>
  );
};

const mapStateToProps = (state) => {
  const sortedByLikes = state.blogs.sort((a, b) => a.likes < b.likes);
  return {
    sortedByLikes,
    blogs: state.blogs,
    user: state.user
  };
};

const mapDispatchToProps = {
  initialiseBlogs,
  removeBlog,
  voteFor
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList);

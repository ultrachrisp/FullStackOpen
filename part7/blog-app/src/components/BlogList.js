import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Blog from './Blog';
import BlogForm from './BlogForm';

import { initialiseBlogs } from '../reducers/blogsReducer';

const BlogList = (props) => {
  useEffect(() => {
    props.initialiseBlogs();
  },[]);

  return (
    <>
      <BlogForm />
      <h2>Blogs</h2>
      { props.sortedByLikes.map(blog => 
                                <div key={blog.id}>
                                  <Link
                                    to={`blogs/${blog.id}`}>
                                    { blog.title }
                                  </Link>
                                </div> 
                               ) }
      
    </>
  );
};

const mapStateToProps = (state) => {
  const sortedByLikes = state.blogs.sort((a, b) => a.likes < b.likes);
  return {
    sortedByLikes
  };
};

const mapDispatchToProps = {
  initialiseBlogs
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList);

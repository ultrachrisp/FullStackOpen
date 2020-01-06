import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import BlogForm from './BlogForm';

import styled from 'styled-components';
import { initialiseBlogs } from '../reducers/blogsReducer';

const BlogLink = styled.div`
border: 1px solid #000;
display: block;
margin-bottom: 10px;
padding: 10px;
`;

const BlogList = (props) => {
  useEffect(() => {
    props.initialiseBlogs();
  },[]);

  return (
    <>
      <BlogForm />
      <h2>Blogs</h2>
      { props.sortedByLikes.map(blog => 
                                <BlogLink key={blog.id}>
                                  <Link
                                    to={`blogs/${blog.id}`}>
                                    { blog.title }
                                  </Link>
                                </BlogLink>
                               ) }
      
    </>
  );
};

const mapStateToProps = (state) => {
  const sortedByLikes = state.blogs.sort((a, b) => a.likes < b.likes);
  return {
    sortedByLikes,
    blogs: state.blogs
  };
};

const mapDispatchToProps = {
  initialiseBlogs
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList);

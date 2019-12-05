import React, { useEffect } from 'react';
import { connect } from 'react-redux';

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
      <p>{props.user.name} logged in
        <button>logout</button>
      </p>
      <BlogForm />
      <h2>blogs</h2>
      {props.sortedByLikes.map(blog =>
                               <Blog
                                   key={ blog.id }
                                 blog={ blog }
                                 currentUser={ props.user.username }
                                 onLike={ handleLike }
                                 onDelete={ handleDelete }/> )}
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

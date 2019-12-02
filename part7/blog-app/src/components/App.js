import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Blog from './Blog';
import BlogForm from './BlogForm';
import LoginForm from './LoginForm';
import Notification from './Notification';
import { useField } from '../hooks/index';

import { initialiseBlogs, removeBlog, voteFor } from '../reducers/blogsReducer';
import { logIn, logOut, checkLogin } from '../reducers/usersReducer';

const App = (props) => {
  const username = useField('text');
  const password = useField('password');

  useEffect(() => {
    props.initialiseBlogs();
    props.checkLogin();
  },[]);

  const handleLogin = (evt) => {
    evt.preventDefault();
    props.logIn({
      username: username.value,
      password: password.value
    });
  };

  const handleLogout = () => {
    props.logOut();
  };

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

  const loginForm = () => {
    return (
      <LoginForm
        username={ username }
        password={ password }
        handleSubmit={ handleLogin } />
    );
  };

  const displayBlogs = () => {
    return (
      <>
        <p>{props.user.name} logged in
          <button onClick={ handleLogout }>logout</button>
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

  return (
    <>
      <h1>Blogs</h1>
      <Notification />
      { props.user === null? loginForm() : displayBlogs() }
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
  voteFor,
  logIn,
  logOut,
  checkLogin
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

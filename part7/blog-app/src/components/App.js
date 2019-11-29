import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Blog from './Blog';
import BlogForm from './BlogForm';
import LoginForm from './LoginForm';
import Notification from './Notification';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { useField } from '../hooks/index';

import { initialiseBlogs, removeBlog, voteFor } from '../reducers/blogsReducer';

const App = (props) => {
  const username = useField('text');
  const password = useField('password');
  const [user, setUser] = useState(null);

  useEffect(() => {
    props.initialiseBlogs();
  },[props]);

  const showMessage = ({ message, type }) => {
    // props.setNotification(message, type, 5000);
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (evt) => {
    evt.preventDefault();
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value });

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      username.clear();
      password.clear();
    }catch(exception){
      showMessage({ messasge: 'Wrong credentials', type:'error' });
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser');
    setUser(null);
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
        <p>{user.name} logged in
          <button onClick={ handleLogout }>logout</button>
        </p>
        <BlogForm />
        <h2>blogs</h2>
        {props.sortedByLikes.map(blog =>
                                 <Blog
                                   key={ blog.id }
                                   blog={ blog }
                                   currentUser={ user.username }
                                   onLike={ handleLike }
                                   onDelete={ handleDelete }/> )}
      </>
    );
  };

  return (
    <>
      <h1>Blogs</h1>
      <Notification />
      { user === null? loginForm() : displayBlogs() }
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
  initialiseBlogs,
  removeBlog,
  voteFor
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

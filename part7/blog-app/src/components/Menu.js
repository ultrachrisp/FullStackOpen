import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import User from './User';
import Blog from './Blog';
import UserList from './UserList';
import BlogList from './BlogList';
import LoginForm from './LoginForm';
import { useField } from '../hooks/index';
import { logIn, logOut, checkLogin } from '../reducers/usersReducer';

const Menu = (props) => {
  const username = useField('text');
  const password = useField('password');

  useEffect(() => {
    props.checkLogin();
  },[]);

  const handleLogin = (evt) => {
    evt.preventDefault();
    props.logIn({
      username: username.value,
      password: password.value
    });
    username.onSubmit();
    password.onSubmit();
  };

  const handleLogout = () => {
    props.logOut();
  };

  const loginForm = () => {
    return (
      <LoginForm
        username={ username }
        password={ password }
        handleSubmit={ handleLogin } />
    );
  };

  const UserStatus = () => {
    return (
      <p>
        { props.user.name } logged in
        <button onClick={ handleLogout }>logout</button>
      </p>
    );
  };

  const Menu = () => {
    return(
      <>
        <Link to="/">Blogs</Link>
        <Link to="/users">Users</Link>
        <UserStatus />
      </>
    );
  };

  const content = props.user === null?
        loginForm():
        (
          <Router>
            <Menu />
            <Route exact path="/" render={() => <BlogList /> }/>
            <Route exact path="/users" render={() => <UserList /> }/>
            <Route path="/users/:id" render={() => <User/> }/>
            <Route path="/blogs/:id" render={() => <Blog/> }/>
          </Router>
        );
  
  return(
    <>
      {content}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  logIn,
  logOut,
  checkLogin
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);

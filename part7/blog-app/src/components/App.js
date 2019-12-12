import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';

import BlogList from './BlogList';
import User from './User';
import UserList from './UserList';
import Notification from './Notification';
import LoginForm from './LoginForm';
import { useField } from '../hooks/index';
import { logIn, logOut, checkLogin } from '../reducers/usersReducer';

const App = (props) => {
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

  const content = props.user === null?
        loginForm():
        (
          <Router>
          <UserStatus />
            <Route exact path="/" render={() => <BlogList /> }/>
            <Route exact path="/users" render={() => <UserList /> }/>
            <Route exact path="/users/:id" render={() => <User/> }/>
          </Router>
        );
  
  return (
    <>
      <h1>Keep track of useful blogs</h1>
      <Notification />
      { content }
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
)(App);

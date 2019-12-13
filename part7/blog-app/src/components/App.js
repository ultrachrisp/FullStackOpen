import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import User from './User';
import Blog from './Blog';
import UserList from './UserList';
import BlogList from './BlogList';
import LoginForm from './LoginForm';
import Notification from './Notification';
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
            <Route exact path="/blogs/:id" render={() => <Blog/> }/>
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

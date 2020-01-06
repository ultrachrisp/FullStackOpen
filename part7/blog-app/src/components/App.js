import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LoginForm from './LoginForm';
import Menu from './Menu';
import Notification from './Notification';
import User from './User';
import UserList from './UserList';
import Blog from './Blog';
import BlogList from './BlogList';

import { checkLogin } from '../reducers/usersReducer';

const App = (props) => {
  useEffect(() => {
    props.checkLogin();
  },[props.user]);
  
  return (
    props.user === null?
      <LoginForm />:
      <Router>
        <Menu />
        <Notification />
        <Route exact path="/" render={() => <BlogList /> }/>
        <Route exact path="/users" render={() => <UserList /> }/>
        <Route path="/users/:id" render={() => <User/> }/>
        <Route path="/blogs/:id" render={() => <Blog/> }/>
      </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  checkLogin
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

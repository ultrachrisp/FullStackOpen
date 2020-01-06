import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import User from './User';
import Blog from './Blog';
import Notification from './Notification';
import UserList from './UserList';
import BlogList from './BlogList';
import LoginForm from './LoginForm';
import { logOut, checkLogin } from '../reducers/usersReducer';

const Menu = (props) => {
  useEffect(() => {
    props.checkLogin();
  },[]);
  
  const handleLogout = () => {
    props.logOut();
  };
  
  const UserStatus = () => {
    return (
      <>
        { props.user.name } logged in
        <button onClick={ handleLogout }>logout</button>
      </>
    );
  };

  return(
    props.user === null?
      <LoginForm />:
      <Router>
        <div>
          <Link to="/">Blogs</Link>
          <Link to="/users">Users</Link>
          <UserStatus />
        </div>
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
  logOut,
  checkLogin
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);

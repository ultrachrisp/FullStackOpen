import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logOut } from '../reducers/usersReducer';

const Menu = (props) => {

  const UserStatus = () => {
    return (
      <>
        { props.user.name } logged in
        <button onClick={ () => props.logOut() }>logout</button>
      </>
    );
  };

  return (
    <div>
      <Link to="/">Blogs</Link>
      <Link to="/users">Users</Link>
      <UserStatus />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  logOut
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);

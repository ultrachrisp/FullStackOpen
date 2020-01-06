import React from 'react';
import { connect } from 'react-redux';

import Menu from './Menu';
import Notification from './Notification';

const App = (props) => {
  return (
    <>
      <Menu />
      <Notification />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  null
)(App);

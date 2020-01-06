import React from 'react';
import { connect } from 'react-redux';

import Menu from './Menu';

const App = (props) => {
  return (
    <>
      <Menu />
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

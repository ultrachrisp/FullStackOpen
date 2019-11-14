import React from 'react';
import { connect } from 'react-redux';

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };

  const msg = props.notifications;
  return (
    <div style={(msg)? style: null}>
      { msg }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications
  };
};

export default connect(
  mapStateToProps,
  null
)(Notification);

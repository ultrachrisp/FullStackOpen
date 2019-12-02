import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const StyledNotification = styled.div`
background-color: #ccc;
padding: 20px;
border: 3px solid ${props => props.type};
`;

const Notification = (props) => {
  const { message, type } = props.notifications;

  if(!message){ return null; }
  const notificationColor = (type === 'status'? 'green' : 'red');

  return (
    <StyledNotification type={( type )? notificationColor: false}>
      { message }
    </StyledNotification>
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

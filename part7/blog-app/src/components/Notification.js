import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const StyledNotification = styled.div`
background-color: #ccc;
padding: 20px;
border: 3px solid ${props => props.type};
`;

const Notification = (props) => {
  
  // const { message, type } = msg;
  const message = props.notifications;
  console.log("called");
  
  if(!message){ return null; }

  // const notificationColor = (type === 'status'? 'green' : 'red');
    // <StyledNotification type={( type )? notificationColor: false}>
  return (
    <StyledNotification>
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

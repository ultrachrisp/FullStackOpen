import React from 'react';
import styled from 'styled-components';

const StyledNotification = styled.div`
background-color: #ccc;
padding: 20px;
border: 3px solid ${props => props.type};
`;

const Notification = ({ msg }) => {
  const { message, type } = msg;
  if(!message){ return null; }

  const notificationColor = (type === 'status'? 'green' : 'red');

  return (
    <StyledNotification type={( type )? notificationColor: false}>
      { message }
    </StyledNotification>
  );
};

export default Notification;

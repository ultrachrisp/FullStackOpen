import React from 'react';

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };

  const msg = props.store.getState().notifications;
  return (
    <div style={(msg)? style: null}>
      { msg }
    </div>
  );
};

export default Notification;

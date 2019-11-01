import React from 'react';

const Notification = ({msg}) => {
  const {message, type} = msg;
  if(!message){ return null; }

  return (
    <div className={type}>
      {message}
    </div>
  );
};

export default Notification;

const notificationReducer = (state = '', action) => {

  switch(action.type){
  case 'SHOW_NOTIFICATION':
    return `${action.data}`;
  case 'HIDE_NOTIFICATION':
    return ``;
  default:
    return state;
  }
};

export function setNotification(message, type, delay) {
  return async dispatch => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: {
        message,
        delay
      }
    });

    await new Promise(resolve => setTimeout(resolve, delay));
    
    dispatch({
      type: 'HIDE_NOTIFICATION',
      data: {}
    });
  };
}

export default notificationReducer;

const notificationReducer = (state = { message:'', type:'' }, action) => {

  switch(action.type){
  case 'SHOW_NOTIFICATION':
    return {
      message: action.data.message,
      type: action.data.type
    };
  case 'HIDE_NOTIFICATION':
    return { message:'', type:'' };
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
        type
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

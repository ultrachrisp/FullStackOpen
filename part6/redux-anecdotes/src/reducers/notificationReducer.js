const notificationsAtStart = [
  '',
  'you voted for'
];

const notificationReducer = (state = [...notificationsAtStart], action) => {
  // console.log('state now: ', state);
  // console.log('action', action);

  switch(action.type){
  case 'SHOW_NOTIFICATION':
    return `${notificationsAtStart[1]} '${action.data.content}'`;
  case 'HIDE_NOTIFICATION':
  default:
    return `${notificationsAtStart[0]}`;
  }
};

function showNotification(content) {
  return {
    type: 'SHOW_NOTIFICATION',
    data: { content }
  };
}
function hideNotification() {
  return {
    type: 'HIDE_NOTIFICATION',
    data: {}
  };
}


export const showNotificationWithTimeout = (dispatch, content) => {
  dispatch(showNotification(content));

  setTimeout(() => {
    dispatch(hideNotification());
  }, 5000);
};

export default notificationReducer;

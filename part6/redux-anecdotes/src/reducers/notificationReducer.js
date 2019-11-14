const notificationsAtStart = [
  '',
  'you voted for'
];

const notificationReducer = (state = [...notificationsAtStart], action) => {

  switch(action.type){
  case 'SHOW_NOTIFICATION':
    return `${notificationsAtStart[1]} '${action.data.content}'`;
  case 'HIDE_NOTIFICATION':
  default:
    return `${notificationsAtStart[0]}`;
  }
};

export function showNotification(content) {
  return {
    type: 'SHOW_NOTIFICATION',
    data: { content }
  };
}

export function hideNotification() {
  return {
    type: 'HIDE_NOTIFICATION',
    data: {}
  };
}

export default notificationReducer;

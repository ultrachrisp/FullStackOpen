const notificationsAtStart = [
  '',
  'you voted for'
];

const notificationReducer = (state = [...notificationsAtStart], action) => {
  // console.log('state now: ', state);
  // console.log('action', action);

  switch(action.type){
  case '':
    return `${notificationsAtStart[1]} '${action.data.content}'`;
  default:
    return `${notificationsAtStart[0]}`;
  }
};

export const notificationFor = content => {
  return {
    type:'SHOW_NOTIFICATION',
    data:{ content }
  };
};

export default notificationReducer;

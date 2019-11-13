const filterReducer = (state = '', action) => {
  // console.log('state now: ', state);
  // console.log('action', action);
  
  switch(action.type){
    case 'SET_FILTER':
      return action.data;
    default:
      return state;
  }
};

export const filterChange = content => {
  
  return {
    type: 'SET_FILTER',
    data: content
  };
};

export default filterReducer;

const anecdoteReducer = (state = [], action) => {
  switch(action.type){
  case 'VOTE':
    return state.map(elem => (elem.id !== action.data.id)? elem : { ...elem, votes : elem.votes+1 });
  case 'NEW_ANECDOTE':
    return [...state, action.data];
  case 'INIT_ANECDOTES':
    return action.data;
  default:
    return state;
  }
};

export const initialiseAnecdotes = data => {
  return {
    type: 'INIT_ANECDOTES',
    data
  };
};

export const createAnecdote = data => {
  return {
    type: 'NEW_ANECDOTE',
    data
  };
};

export const voteFor = id => {
  return {
    type:'VOTE',
    data:{ id }
  };
};

export default anecdoteReducer;

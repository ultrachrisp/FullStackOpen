import anecdotesService from '../services/anecdotes';

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

export const initialiseAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    });
  };
};

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    });
  };
};

export const voteFor = id => {
  return {
    type:'VOTE',
    data:{ id }
  };
};

export default anecdoteReducer;

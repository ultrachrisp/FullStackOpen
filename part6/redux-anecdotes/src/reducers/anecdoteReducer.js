import anecdotesService from '../services/anecdotes';

const anecdoteReducer = (state = [], action) => {
  switch(action.type){
  case 'VOTE':
    return state.map(elem => (elem.id !== action.data.id)? elem: { ...elem, votes : action.data.votes });
    // console.log(update);
    // console.log(state);
    // return [...state, update];
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
    const newAnecdote = await anecdotesService.create(content);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    });
  };
};

export const voteFor = content => {
  return async dispatch => {
    const updatedAnecdote = await anecdotesService.update(content);
    dispatch({
      type:'VOTE',
      data: updatedAnecdote
    });
  };
};

export default anecdoteReducer;

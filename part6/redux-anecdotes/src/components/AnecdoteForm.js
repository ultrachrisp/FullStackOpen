import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = (props) => {
  
  const addAnecdote = (evt) => {
    evt.preventDefault();
    const content = evt.target.newAnecdote.value;
    evt.target.newAnecdote.value = '';
    props.store.dispatch(
      createAnecdote(content)
    );
  };
  
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={ addAnecdote }>
        <div><input name='newAnecdote'/></div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;

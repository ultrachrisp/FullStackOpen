import React from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import anecdotesService from '../services/anecdotes';

const AnecdoteForm = (props) => {
  
  const addAnecdote = async (evt) => {
    evt.preventDefault();
    const content = evt.target.newAnecdote.value;
    evt.target.newAnecdote.value = '';
    const newAnecdote = await anecdotesService.createNew(content);
    props.createAnecdote(newAnecdote);
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

export default connect(
  null,
  { createAnecdote }
)(AnecdoteForm);

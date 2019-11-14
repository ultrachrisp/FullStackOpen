import React from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = (props) => {
  
  const addAnecdote = async (evt) => {
    evt.preventDefault();
    const content = evt.target.newAnecdote.value;
    evt.target.newAnecdote.value = '';
    props.createAnecdote(content);
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

import React from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = (props) => {
  
  const addAnecdote = (evt) => {
    evt.preventDefault();
    const content = evt.target.newAnecdote.value;
    props.createAnecdote(content);
    evt.target.newAnecdote.value = '';
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

const mapDispatchToProps = {
  createAnecdote
};

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm);

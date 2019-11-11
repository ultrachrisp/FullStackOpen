import React from 'react';
import { createAnecdote } from './reducers/anecdoteReducer';

const App = (props) => {
  const anecdotes = props.store.getState();

  const vote = (id) => {
    console.log('vote', id);
    props.store.dispatch({ type:'VOTE', id });
  };

  const addAnecdote = (evt) => {
    evt.preventDefault();
    const content = evt.target.newAnecdote.value;
    evt.target.newAnecdote.value = '';
    props.store.dispatch(
      createAnecdote(content)
    );
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={ addAnecdote }>
        <div><input name='newAnecdote'/></div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;

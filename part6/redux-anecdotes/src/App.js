import React from 'react';
import { createAnecdote, voteFor } from './reducers/anecdoteReducer';

const App = (props) => {
  const anecdotes = props.store.getState();

  const vote = (id) => {
    // console.log('vote', id);
    props.store.dispatch( voteFor(id) );
  };

  const addAnecdote = (evt) => {
    evt.preventDefault();
    const content = evt.target.newAnecdote.value;
    evt.target.newAnecdote.value = '';
    props.store.dispatch(
      createAnecdote(content)
    );
  };

  const sort = anecdotes.sort((a,b) => b.votes - a.votes);
  
  return (
    <div>
      <h2>Anecdotes</h2>
      {sort.map(anecdote =>
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

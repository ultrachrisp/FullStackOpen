import React from 'react';
import { voteFor } from '../reducers/anecdoteReducer';
import { notificationFor } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
  const vote = ({id, content}) => {
    props.store.dispatch( voteFor(id) );
    props.store.dispatch( notificationFor(content) );
  };
  const anecdotes = props.store.getState().anecdotes.sort((a,b) => b.votes - a.votes);

  return anecdotes.map(anecdote =>
                       <div key={anecdote.id}>
                         <div>
                           {anecdote.content}
                         </div>
                         <div>
                           has {anecdote.votes}
                           <button onClick={() => vote(anecdote)}>vote</button>
                         </div>
                       </div>
                      );
};

export default AnecdoteList;

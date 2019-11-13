import React from 'react';
import { voteFor } from '../reducers/anecdoteReducer';
import { showNotificationWithTimeout } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
  const { anecdotes, filter } = props.store.getState();
  
  const vote = ({id, content}) => {
    props.store.dispatch( voteFor(id) );
    showNotificationWithTimeout(props.store.dispatch, content);
  };
  // const anecdotes = props.store.getState().anecdotes.sort((a,b) => b.votes - a.votes);
  const sorted = anecdotes.sort((a,b) => b.votes - a.votes);
  const filtered = sorted.filter(elem => elem.content.toLowerCase().includes(filter.toLowerCase()) );

  return filtered.map(anecdote =>
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

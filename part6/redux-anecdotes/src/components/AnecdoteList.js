import React from 'react';
import { voteFor } from '../reducers/anecdoteReducer';
import { showNotificationWithTimeout } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
  const { anecdotes, filter } = props.store.getState();
  
  const vote = ({id, content}) => {
    props.store.dispatch( voteFor(id) );
    showNotificationWithTimeout(props.store.dispatch, content);
  };

  // const filtered = anecdotes.filter(elem => elem.content.toLowerCase().includes(filter.toLowerCase()) );
  // const sorted = filtered.sort((a,b) => b.votes - a.votes);
  const filteredAndSorted = anecdotes.filter(elem => elem.content.toLowerCase().includes(filter.toLowerCase()) ).sort((a,b) => b.votes - a.votes);

  return filteredAndSorted.map(anecdote =>
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

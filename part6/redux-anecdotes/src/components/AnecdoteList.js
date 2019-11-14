import React from 'react';
import { connect } from 'react-redux';
import { voteFor } from '../reducers/anecdoteReducer';
import { showNotification, hideNotification } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
  const { anecdotes, filter } = props;
  
  const vote = ({id, content}) => {
    props.voteFor(id);
    props.showNotification(content);
    setTimeout(() => {
      props.hideNotification();
    }, 5000);
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  };
};

const mapDispatchToProps = {
  voteFor,
  showNotification,
  hideNotification
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);

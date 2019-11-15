import React from 'react';
import { connect } from 'react-redux';
import { voteFor } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
  const { anecdotesToShow } = props;
  
  const vote = (content) => {
    const votedFor = { ...content, votes: content.votes+1 };
    props.voteFor(votedFor);
    props.setNotification(`you voted '${content.content}'`, 5000);
  };

  return anecdotesToShow.map(anecdote =>
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
  const anecdotesToShow = state.anecdotes.filter(elem => elem.content.toLowerCase().includes(state.filter.toLowerCase()) ).sort((a,b) => b.votes - a.votes);
  return {
    anecdotesToShow
  };
};

const mapDispatchToProps = {
  voteFor,
  setNotification
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);

import React from 'react';
import { connect } from 'react-redux';
import { voteFor } from '../reducers/anecdoteReducer';
import { showNotification, hideNotification } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
  const { anecdotesToShow } = props;
  
  const vote = ({id, content}) => {
    props.voteFor(id);
    props.showNotification(content);
    setTimeout(() => {
      props.hideNotification();
    }, 5000);
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
  showNotification,
  hideNotification
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);

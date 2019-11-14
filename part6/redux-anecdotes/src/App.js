import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Filter from './components/Filter';
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';

import anecdotesService from './services/anecdotes';
import { initialiseAnecdotes } from './reducers/anecdoteReducer';

const App = (props) => {
  useEffect(() => {
    anecdotesService.getAll()
      .then(anecdote => props.initialiseAnecdotes(anecdote));
  });
  
  return (
    <>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteForm />
      <br/>
      <AnecdoteList />
    </>
  );
};

export default connect(null, { initialiseAnecdotes })(App);

import React from 'react';
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';

const App = (props) => {
  return (
    <>
      <h2>Anecdotes</h2>
      <AnecdoteList store={ props.store } />
      <AnecdoteForm store={ props.store } />
    </>
  );
};

export default App;

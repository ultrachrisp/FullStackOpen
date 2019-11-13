import React from 'react';
import Filter from './components/Filter';
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';

const App = (props) => {
  return (
    <>
      <h2>Anecdotes</h2>
      <Notification store={ props.store }/>
      <Filter store={ props.store } />
      <AnecdoteForm store={ props.store } />
      <br/>
      <AnecdoteList store={ props.store } />
    </>
  );
};

export default App;

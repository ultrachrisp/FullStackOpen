import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

const App = () => {
  const clickHandler = (evt) => {
    store.dispatch({
      type: evt.target.name
    });
  };

  return (
    <div>
      <button name='GOOD' onClick={ clickHandler }>good</button>
      <button name='OK' onClick={ clickHandler }>neutral</button>
      <button name='BAD' onClick={ clickHandler }>bad</button>
      <button name='ZERO' onClick={ clickHandler }>reset stats</button>
      <div>good { store.getState().good }</div>
      <div>neutral { store.getState().ok }</div>
      <div>bad { store.getState().bad }</div>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();
store.subscribe(renderApp);

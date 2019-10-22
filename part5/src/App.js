import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (evt) => {
    evt.preventDefault();
  };
  
  return (
    <div className="App">
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            type="text"
            name="Username"
            value={username}
            onChange={({target}) => setUsername(target.value)}/>
        </div>
        <div>
          Password
          <input
            type="password"
            name="Passowrd"
            value={password}
            onChange={({target}) => setPassword(target.value)}/>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default App;

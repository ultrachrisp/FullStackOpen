import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import loginService from './services/login';
import blogService from './services/blogs';
import './App.css';

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);

  const handleLogin = async (evt) => {
    evt.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    }catch(exception){
      setErrorMessage('Wrong credentials');
      setTimeOut(() => setErrorMessage(null), 5000);
    }
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

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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      // blogService.setToken(user.token);
    }
  });
  
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
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' };
    const showWhenVisible = { display: loginVisible ? '' : 'none' };
    
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <form onSubmit={handleLogin} style={showWhenVisible}>
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
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </form>
      </div>
    );
  };
  
  return (
    <div>
      <h1>Blogs</h1>

      {user === null? loginForm() :
       <div>
         <p>{user.name} logged in</p>
       </div>
      }
    </div>
  );
}

export default App;

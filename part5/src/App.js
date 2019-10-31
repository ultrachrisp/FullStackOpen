import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import loginService from './services/login';
import blogService from './services/blogs';
import './App.css';

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);
  const [blog, setBlog] = useState({ title:'', author:'', url:'' });

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs));
  }, []);
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  
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

  const handleLogout = (evt) => {
    window.localStorage.removeItem('loggedBlogUser');
    setUser(null);
  };

  const handleBlogChange = (evt) => {
    setBlog({
      ...blog,
      [evt.target.name]: evt.target.value
    });
  };

  const handleOnclick = (evt) => {
    const id = evt.target.name;

    blogService
      .delete(id)
      .then(result => {
        console.log('Progress');
      })
      .catch(error =>{
        setErrorMessage('Could not delete entry');
      });
  };

  const addBlog = (evt) => {
    evt.preventDefault();
    const blogObject = {
      content: blog,
    };

    blogService
      .create(blogObject)
      .then(date => {
        setBlogs(blogs.concat(date));
        setBlog({ title:'',author:'', url:'' });
      })
      .catch(error => {
        setErrorMessage('Could not add the blog');
        setTimeout(() => setErrorMessage(null), 5000);
      });
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

      <Notification message={errorMessage}/>
      
      {user === null? loginForm() :
       <div>
         <p>{user.name} logged in
           <button onClick={handleLogout}>logout</button>
         </p>
         <BlogForm
           onSubmit={addBlog}
           handleChange={handleBlogChange}
         />
         <h2>blogs</h2>
         {blogs.map(blog => <Blog key={blog.id}  blog={blog} onClick={handleOnclick}/> )}
       </div>
      }
    </div>
  );
}

export default App;

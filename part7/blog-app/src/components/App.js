import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Blog from './Blog';
import BlogForm from './BlogForm';
import LoginForm from './LoginForm';
import Notification from './Notification';
import Togglable from './Togglable';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { useField } from '../hooks/index';

import { setNotification } from '../reducers/notificationReducer';
import { initialiseBlogs, createBlog, voteFor } from '../reducers/blogsReducer';

const App = (props) => {
  const [blogs, setBlogs] = useState([]);
  const username = useField('text');
  const password = useField('password');
  const [user, setUser] = useState(null);
  const [blog, setBlog] = useState({ title:'', author:'', url:'', likes:0 });

  useEffect(() => {
    props.initialiseBlogs();
  },[]);

  const showMessage = ({ message, type }) => {
    props.setNotification(message, type, 5000);
  };

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
      const user = await loginService.login({
        username: username.value,
        password: password.value });

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      username.clear();
      password.clear();
    }catch(exception){
      showMessage({ messasge: 'Wrong credentials', type:'error' });
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser');
    setUser(null);
  };

  const handleBlogChange = (evt) => {
    setBlog({
      ...blog,
      [evt.target.name]: evt.target.value
    });
  };

  const handleDelete = (evt) => {

    if(window.confirm('Remove blog'))
    {
      const id = evt.target.name;

      blogService
        .remove(id)
        .then(result => {
          setBlogs(blogs.filter(blog => blog.id !== id));
          showMessage({ message: 'Message deleted', type:'update' });
        })
        .catch(error => {
          showMessage({ message:'Could not delete entry', type:'error' });
        });
    }
  };

  const handleLike = (evt) => {
    const blog = props.blogs.find(elem => elem.id === evt.target.name);
    blog.likes++;

    props.voteFor(blog);

    // blogService
    //   .update(blog)
    //   .then(result => {
    //     setBlogs( blogs.map(blog => (blog.id === id)? blog = result: blog) );
    //   })
    //   .catch(error => {
    //     showMessage({ message:'Could not add like to entry', type:'error' });
    //   });
  };

  const blogFormRef = React.createRef();
  const addBlog = (evt) => {
    evt.preventDefault();
    blogFormRef.current.toggleVisibility();

    const blogObject = {
      content: blog,
    };

    blogService
      .create(blogObject)
      .then(date => {
        setBlogs(blogs.concat(date));
        setBlog({ title:'',author:'', url:'' });
        showMessage({ message: 'Blog added successfully', type:'status' });
      })
      .catch(error => {
        showMessage({ message: 'Could not add the blog', type:'error' });
      });
  };

  const loginForm = () => {
    return (
      <Togglable buttonLabel="log in">
        <LoginForm
          username={ username }
          password={ password }
          handleSubmit={ handleLogin }
        />
      </Togglable>
    );
  };



  return (
    <div>
      <h1>Blogs</h1>

      <Notification />

      {user === null? loginForm() :
       <div>
         <p>{user.name} logged in
           <button onClick={handleLogout}>logout</button>
         </p>
         <Togglable buttonLabel="new blog" ref={blogFormRef}>
           <BlogForm
             onSubmit={addBlog}
             handleChange={handleBlogChange}
           />
         </Togglable>
         <h2>blogs</h2>
         {props.sortedByLikes.map(blog => <Blog
                                            key={ blog.id }
                                            blog={ blog }
                                            currentUser={ user.username }
                                            onLike={ handleLike }
                                            onDelete={ handleDelete }/> )}
       </div>
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  const sortedByLikes = state.blogs.sort((a, b) => a.likes < b.likes);
  return {
    sortedByLikes,
    blogs: state.blogs
  };
};

const mapDispatchToProps = {
  setNotification,
  initialiseBlogs,
  voteFor
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

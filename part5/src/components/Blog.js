import React, { useState }from 'react';
import styled from 'styled-components';

const StyledBlog = styled.div`
border: 1px solid #000;
display: block;
margin-bottom: 10px;
padding: 10px;
`;

const Blog = ({ blog, onClick }) => {
  const [visible, setVisible] = useState(false);
  
  const hideWhenVisible = { display: visible ? 'none' : '' },
        showWhenVisible = { display: visible ? '' : 'none' },
        toggleVisibility = () => { setVisible(!visible); },
        { title, author, url, likes, user } = blog;
  
  return (
    <StyledBlog>
      <div onClick={() => toggleVisibility() }>
        { title } by { author }
      </div>
      <div style={ showWhenVisible }>
        <a href={ url }>{ url }</a>
        <div>{likes}<button onClick={()=>{}}>Like</button></div>
        <div>Added by { user[0].username }</div>
        <button name={blog.id} onClick={onClick}>Delete</button>
      </div>
    </StyledBlog>
  );};

export default Blog;

import React, { useState }from 'react';
import styled from 'styled-components';

const StyledBlog = styled.div`
border: 1px solid #000;
display: block;
margin-bottom: 10px;
padding: 10px;
`;

const Blog = ({ blog, onLike, onDelete, currentUser }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = { display: visible ? '' : 'none' },
        toggleVisibility = () => { setVisible(!visible); },
        { title, author, url, likes, user } = blog;

  return (
    <StyledBlog>
      <div className="toggleSwitch" onClick={() => toggleVisibility() }>
        { title } by { author }
      </div>
      <div style={ toggleVisible }>
        <a href={ url }>{ url }</a>
        <div>{likes}<button name={blog.id} onClick={onLike}>Like</button></div>
        <div>Added by { user[0].username }</div>
        { (currentUser === user[0].username) &&
          <button name={blog.id} onClick={onDelete}>Delete</button>
        }
      </div>
    </StyledBlog>
  );};

export default Blog;

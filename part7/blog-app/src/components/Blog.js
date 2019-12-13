import React, { useState }from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { removeBlog, voteFor } from '../reducers/blogsReducer';

const StyledBlog = styled.div`
border: 1px solid #000;
display: block;
margin-bottom: 10px;
padding: 10px;
`;

// const Blog = ({ blog, onLike, onDelete, currentUser }) => {
const Blog = (props) => {
  const { id } = useParams();

  const { title, author, url, likes, user } = props.blogs.filter(blog => blog.id === id)[0];

  
  const onDelete = (evt) => {
    if(window.confirm('Remove blog')) {
      props.removeBlog(evt.target.name);
    }
  };
  
  const onLike = (evt) => {
    const blog = props.blogs.find(elem => elem.id === evt.target.name);
    blog.likes++;
    
    props.voteFor(blog);
  };

  return (
    <StyledBlog className="blog">
      <div>
        <a href={ url }>{ url }</a>
        <div>{likes}<button name={id} onClick={onLike}>Like</button></div>
        <div>Added by { user[0].username }</div>
        { /*(currentUser === user[0].username) &&*/
          <button name={id} onClick={onDelete}>Delete</button>
        }
      </div>
    </StyledBlog>
  );};

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  };
};

const mapDispatchToProps = {
  removeBlog,
  voteFor
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog);

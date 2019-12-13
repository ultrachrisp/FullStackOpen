import React from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';

import styled from 'styled-components';
import { removeBlog, voteFor } from '../reducers/blogsReducer';

const StyledBlog = styled.div`
border: 1px solid #000;
display: block;
margin-bottom: 10px;
padding: 10px;
`;

const Blog = (props) => {
  const { id } = useParams();  
  const blog = props.blogs.filter(blog => blog.id === id)[0];

  const onDelete = (evt) => {
    if(window.confirm('Remove blog')) {
      props.removeBlog(evt.target.name);
      props.history.push('/');
    }
  };
  
  const onLike = (evt) => {
    const blog = props.blogs.find(elem => elem.id === evt.target.name);
    blog.likes++;
    props.voteFor(blog);
  };

  return (!blog)?
    null:
    (
      <StyledBlog className="blog">
        <div>
          <a href={ blog.url }>{ blog.url }</a>
          <div>{blog.likes}<button name={id} onClick={onLike}>Like</button></div>
          <div>Added by { blog.user[0].username }</div>
          { (props.user.username === blog.user[0].username) &&
            <button name={id} onClick={onDelete}>Delete</button>
          }
        </div>
      </StyledBlog>
    );
  };

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  };
};

const mapDispatchToProps = {
  removeBlog,
  voteFor
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog));

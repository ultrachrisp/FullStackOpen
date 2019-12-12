import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

const User = (props) => {
  const { id } = useParams();
  const userBlogs = props.blogs.filter(blog => blog.user[0].id === id);

  return (!userBlogs[0])?
    null:
    (
      <>
        <h2>{userBlogs[0].user[0].username}</h2>
        <ul>
          { userBlogs.map(blog => <li key={ blog.id }>{ blog.title }</li>) }
        </ul>
      </>
    );
};
const mapStateToProps = (state, ownProps) => {
  return {
    blogs: state.blogs
  };
};

export default connect(
  mapStateToProps,
  null
)(User);

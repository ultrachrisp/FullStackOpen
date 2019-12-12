import React from 'react';
import { connect } from 'react-redux';

const User = (props) => {
  return (
    <>
      <div>Some stuffs</div>
    </>
  );
};
const mapStateToProps = (state, ownProps) => {
  const userBlogs = state.blogs.filter(blog => console.log(blog));
  return {
    blogs: userBlogs
  };
};

export default connect(
  mapStateToProps,
  null
)(User);

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { initialiseBlogs } from '../reducers/blogsReducer';

const UserList = (props) => {
  useEffect(() => {
    props.initialiseBlogs();
  },[]);
  
  const uniqueUsers = props.blogs && props.blogs.reduce((unique, item) => unique.includes(item.user[0].id)? unique: [...unique, item.user[0].id], []);
  
  return (
    <>
      <h2>Users</h2>
      { uniqueUsers.map(() => console.log(uniqueUsers) )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  };
};
const mapDispatchToProps = {
  initialiseBlogs
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);

import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

const User = (props) => {
  let { id } = useParams();
  console.log(id);
  return (
    <>
      <div>Some stuffs</div>
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

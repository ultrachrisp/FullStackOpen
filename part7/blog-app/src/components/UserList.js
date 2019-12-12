import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { initialiseBlogs } from '../reducers/blogsReducer';

const UserList = (props) => {
  useEffect(() => {
    props.initialiseBlogs();
  },[]);

  const uniqueUsers = Object.create(null);
  props.blogs.forEach(item => {
    if(uniqueUsers[item.user[0].id]){
      uniqueUsers[item.user[0].id].count = uniqueUsers[item.user[0].id].count + 1;
    } else {
      uniqueUsers[item.user[0].id] = {
        id: item.user[0].id,
        name: item.user[0].username,
        count: 1
      };
    }
    return uniqueUsers[item.user[0].id];
  });


  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          { Object.keys(uniqueUsers).map((item => 
                                          <React.Fragment key={ item }>
                                            { console.log(uniqueUsers[item].id) }
              <tr>
                <td>{ uniqueUsers[item].name }</td>
                <td>{ uniqueUsers[item].count }</td> 
              </tr>
</React.Fragment>
          )) }
        </tbody>
      </table>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
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

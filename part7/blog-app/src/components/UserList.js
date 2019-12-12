import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { initialiseBlogs } from '../reducers/blogsReducer';
import { Link } from 'react-router-dom';

const UserList = (props) => {
  useEffect(() => {
    props.initialiseBlogs();
  },[]);

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
          { Object.keys(props.uniqueUsers).map(
            item => 
              <React.Fragment key={ item }>
                <tr>
                  <td>
                    <Link to={ `users/${props.uniqueUsers[item].id}` }>
                      { props.uniqueUsers[item].name }
                    </Link>
                  </td>
                  <td>
                    { props.uniqueUsers[item].count }
                  </td> 
                </tr>
              </React.Fragment>
          )}
        </tbody>
      </table>
    </>
  );
};

const mapStateToProps = (state) => {
  const uniqueUsers = Object.create(null);
  
  state.blogs.forEach(item => {
    const user = item.user[0];
    if(uniqueUsers[user.id]){
      uniqueUsers[user.id].count = uniqueUsers[user.id].count + 1;
    } else {
      uniqueUsers[user.id] = {
        id: user.id,
        name: user.username,
        count: 1
      };
    }
  });
  
  return {
    blogs: state.blogs,
    uniqueUsers
  };
};
const mapDispatchToProps = {
  initialiseBlogs
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);

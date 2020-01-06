import React from 'react';
import { connect } from 'react-redux';
import Togglable from './Togglable';

import { useField } from '../hooks/index';
import { logIn } from '../reducers/usersReducer';

const LoginForm =(props) => {
  const username = useField('text');
  const password = useField('password');

  const handleLogin = (evt) => {
    evt.preventDefault();
    props.logIn({
      username: username.value,
      password: password.value
    });
    username.onSubmit();
    password.onSubmit();
  };
  
  return (
    <Togglable buttonLabel="log in">
      <form onSubmit={ handleLogin } className="login">
        <div>
          Username
          <input { ...username } />
        </div>
        <div>
          Password
          <input { ...password } />
        </div>
        <button type="submit">login</button>
      </form>
    </Togglable>
  );
};

const mapDispatchToProps = {
  logIn
};

export default connect(
  null,
  mapDispatchToProps
)(LoginForm);

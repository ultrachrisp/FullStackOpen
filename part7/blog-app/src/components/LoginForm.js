import React from 'react';
import Togglable from './Togglable';
import PropTypes from 'prop-types';

const LoginForm =({ handleSubmit, username, password }) => {
  return (
    <Togglable buttonLabel="log in">
      <form onSubmit={handleSubmit} className="login">
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

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
};

export default LoginForm;

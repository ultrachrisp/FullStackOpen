import React from 'react';
import PropTypes from 'prop-types';

const LoginForm =({
  handleSubmit,
  username,
  password
}) => {
  return (
    <form onSubmit={handleSubmit} className="login">
      <div>
        Username
        <input { ...username } />
      </div>
      <div>
        Password
        <input { ...password }/>
      </div>
      <button type="submit">login</button>
    </form>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
};

export default LoginForm;

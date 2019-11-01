import React from 'react';

const LoginForm =({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        Username
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}/>
      </div>
      <div>
        Password
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}/>
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;

import React, { useState } from 'react';
import { connect } from 'react-redux';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (evt) => setValue(evt.target.value);

  return {
    type,
    value,
    onChange
  };
};

const BlogForm = ({ onSubmit }) => {
  const url  = useField('text');
  const title = useField('text');
  const author = useField('text');

  return (
    <div>
      <h2>Create a Blog Entry</h2>
      <form onSubmit={ onSubmit }>
        <div>
          Title
          <input { ...title }/>
        </div>
        <div>
          Author
          <input { ...author }/>
        </div>
        <div>
          Url
          <input { ...url }/>
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default BlogForm;

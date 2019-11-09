import React from 'react';

const BlogForm = ({ onSubmit, handleChange, titleValue, authorValue, urlValue }) => (
  <div>
    <h2>Create a Blog Entry</h2>
    <form onSubmit={ onSubmit }>
      <div>
        Title
        <input
          type="text"
          name="title"
          value={ titleValue }
          onChange={ handleChange }/>
      </div>
      <div>
        Author
        <input
          type="text"
          name="author"
          value={ authorValue }
          onChange={ handleChange }/>
      </div>
      <div>
        Url
        <input
        type="text"
        name="url"
        value={ urlValue }
        onChange={ handleChange }/>
        </div>
      <button type="submit">save</button>
    </form>
  </div>
);

export default BlogForm;

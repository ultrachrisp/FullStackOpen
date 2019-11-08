import React from 'react';

const SimpleBlog = ({ blog, onClick }) => (
  <>
    <div>
      {blog.title} {blog.author}
    </div>
    <div>
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </>
);

export default SimpleBlog;

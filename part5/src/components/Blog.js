import React from 'react';
const Blog = ({ blog, onClick }) => (
  <div>
    {blog.title} {blog.author} <button name={blog.id} onClick={onClick}>Delete</button>
  </div>
);

export default Blog;

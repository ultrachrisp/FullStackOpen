const blogsRouter = require('express').Router();
const Blog = require('../models/blogs');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post('/', async (request, response) => {
  const { body } = request;

  if(!body.title || !body.author || !body.url || !body.likes){
    response.status(400).json({ error: 'Fields are empty'});
  }
  
  const blog = new Blog(body);
  const savedBlog = await blog.save();
  response.status(201).json(savedBlog.toJSON());
});

module.exports = blogsRouter;

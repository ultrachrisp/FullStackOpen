const blogsRouter = require('express').Router();
const Blog = require('../models/blogs');

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({});
  return response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post('/', async (request, response, next) => {
  const { body } = request;

  if(!body.title || !body.author || !body.url){
      return response.status(400).send({ error: 'Fields are empty'});
  }
  
  const blog = new Blog(body);
  try{
    const savedBlog = await blog.save();
    return response.status(201).json(savedBlog.toJSON());
  } catch(exception){
    return next(exception);
  }
});

module.exports = blogsRouter;

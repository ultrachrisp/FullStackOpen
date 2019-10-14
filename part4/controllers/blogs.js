const blogsRouter = require('express').Router();
const Blog = require('../models/blogs');
const {unknownEndpoint, errorHandler} = require('../utils/middleware');

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({});
  response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id).catch(error => next(error));
    if(blog){
      response.json(blog.toJSON());
    } else {
      response.status(404).end();
    }
  } catch(exception){ next(exception); }
});

blogsRouter.post('/', async (request, response, next) => {
  const { body } = request;

  if(!body.title || !body.author || !body.url){
    response.status(400).send({ error: 'Fields are empty'});
    return;
  }
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: (body.likes)? body.likes: 0
  });
  
  try {
    const savedBlog = await blog.save();
    response.json(savedBlog.toJSON());
  } catch(exception){ next(exception); }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception){ next(exception); };
});

module.exports = blogsRouter;

const blogsRouter = require('express').Router();
const Blog = require('../models/blogs');
const User = require('../models/user');
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
  const { body } = request,
        user = await User.findById(body.userId);

  if(!body.title || !body.author || !body.url){
    return response.status(400).send({ error: 'Fields are empty'});
  }
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: (body.likes)? body.likes: 0,
    user: user._id
  });
  
  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.json(savedBlog.toJSON());
  } catch(exception){ next(exception); }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception){ next(exception); };
});

blogsRouter.put('/:id', async (request, response, next) => {
  const { body } = request;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  };

  try{
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true});
    response.json(updatedBlog.toJSON());
  } catch (exception) { next(exception); };
});

module.exports = blogsRouter;

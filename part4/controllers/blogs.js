const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const blogsRouter = require('express').Router();
const Blog = require('../models/blogs');
const User = require('../models/user');
const {unknownEndpoint, errorHandler, tokenExtractor} = require('../utils/middleware');

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog
        .find({})
        .populate('user', {username: 1, name: 1});

  response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if(blog){
      response.json(blog.toJSON());
    } else {
      response.status(404).end();
    }
  } catch(exception){ next(exception); }
});

blogsRouter.post('/', async (request, response, next) => {

  const token = tokenExtractor(request);
  try{
    const decodedToken = jwt.verify(token, config.SECRET);
    if(!token || !decodedToken.id){
      return response.status(401).json({error: 'token missing or invalid'});
    }
  
    const user = await User.findById(decodedToken.id);
    const {title, author, url, likes} = request.body.content;

    if(!title || !author || !url){
      return response.status(400).send({ error: 'fields are empty'});
    }
    
    const blog = new Blog({
      title,
      author,
      url,
      likes: (likes)? likes: 0,
      user: user._id
    });
    
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.json(savedBlog.toJSON());
  } catch(exception){ next(exception); }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  const token = tokenExtractor(request);
  try {
    const decodedToken = jwt.verify(token, config.SECRET);
    if(!token || !decodedToken.id){
      return response.status(401).json({error: 'token missing or invalid'});
    }
    
    const blog = await Blog.findById(request.params.id);

    if(blog.user.toString() === decodedToken.id.toString()){
      const msg = await Blog.deleteOne({_id: request.params.id});
      if(!msg){
        response.status(404).end();
      } else {
        response.status(204).end();
      }
    }
  } catch (exception){ next(exception); };
});

blogsRouter.put('/:id', async (request, response, next) => {
  const { title, author, url, likes } = request.body.content;
  const blog = { title, author, url, likes };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true});
    response.json(updatedBlog.toJSON());
  } catch (exception) { next(exception); };
});

module.exports = blogsRouter;

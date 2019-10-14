const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blogs');

beforeEach(async () => {
  await Blog.deleteMany({});

  /* Async version, no guarantee the objects will be saved in the order given... harder to test then*/
  // const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
  // const promiseArray = blogObjects.map(blog => blog.save());
  // await Promise.all(promiseArray);

  for (let blog of helper.initialBlogs){
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('the number of  notes', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body.length).toBe(helper.initialBlogs.length);
});

test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body[0].url).toBe('https://reactpatterns.com/');
});

// describe('New blogs', async () => {  
test('are given an id & likes default to 0', async () => {
  await api
    .post('/api/blogs')
    .send(helper.singleBlog[0])
    .expect(201)
    .expect('Content-Type', /application\/json/);
  
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd.map(n => n.id)).toBeDefined();
  expect(blogsAtEnd.map(n => n.likes)).toBeDefined();
});
         
test('a valid blog can be added ', async () => {
  await api
    .post('/api/blogs')
    .send(helper.singleBlog[0])
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);
  
  const contents = blogsAtEnd.map(n => n.title);
  expect(contents).toContain('Why Clojure');
});

test('blog without content is not added', async () => {
  const newBlog = {
    likes: 2
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});

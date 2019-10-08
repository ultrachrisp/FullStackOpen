const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./helper');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blogs');

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[2]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[3]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[4]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[5]);
  await blogObject.save();
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

test('a valid blog can be added ', async () => {
  const newBlog = {
    _id: "5a422bc61b54a676234d19fc",
    title: "Why Clojure",
    author: "Robert C. Martin",
    url: "https://blog.cleancoder.com/uncle-bob/2019/08/22/WhyClojure.html",
    likes: 2,
    __v: 0
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);
  
  const contents = blogsAtEnd.map(n => n.title);
  expect(contents).toContain('Why Clojure');
});

afterAll(() => {
  mongoose.connection.close();
});

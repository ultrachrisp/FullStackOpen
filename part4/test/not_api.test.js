const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('there are four notes', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body.length).toBe(1);
});

test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/blogs');
  console.log(response.body[0]);

  expect(response.body[0].url).toBe('http://chrispyke.com');
});

afterAll(() => {
  mongoose.connection.close();
});

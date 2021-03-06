const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blogs');
const User = require('../models/user');

beforeEach(async () => {
  // await User.deleteMany({});
  // const user = new User({ username: 'root', password: 'secret'});
  // await user.save();
  
  await Blog.deleteMany({});
  // const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
  // const promiseArray = blogObjects.map(blog => blog.save());
  // await Promise.all(promiseArray);

  for (let blog of helper.initialBlogs){
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

describe('when there is initially some notes saved', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body.length).toBe(helper.initialBlogs.length);
  });

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs');

    const contents = response.body.map(r => r.url);
    expect(contents).toContain('https://reactpatterns.com/');
  });
});

describe('viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToView = blogsAtStart[0];
    const resultNote = await api
          .get(`/api/blogs/${blogToView.id}`)
          .expect(200)
          .expect('Content-Type', /application\/json/);

    expect(resultNote.body).toEqual(blogToView);
  });

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNoneExistingId = await helper.nonExistingId();

    // console.log(validNoneExistingId);

    await api
      .get(`/api/blogs/${validNoneExistingId}`)
      .expect(404);
  });

  // test('fails with statuscode 400 id is invalid', async () => {
  //   const invalidId = '5a3d5da59070081a82a3445';

  //   await api
  //     .get(`/api/notes/${invalidId}`)
  //     .expect(400);
  // });
});

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: "Why Clojure",
      author: "Robert C. Martin",
      url: "https://blog.cleancoder.com/uncle-bob/2019/08/22/WhyClojure.html",
      likes: 7,
      user: 123458,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);

    const contents = blogsAtEnd.map(n => n.title);
    expect(contents).toContain('Why Clojure');
  });

  test('has 0 likes if likes is not defined', async () => {
    const noLikes = {
      title: "This is rubbish",
      author: "Robert C. Martin",
      url: "https://blog.cleancoder.com/uncle-bob/2019/08/22/ThisIsRubbish.html",
      user: 123458,
    };

    await api
      .post('/api/blogs')
      .send(noLikes)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const newBlog = blogsAtEnd.filter(blog => blog.title === noLikes.title);
    expect(newBlog[0].likes).toBe(0);
  });

  test('fails with status code 400 if data invalid', async () => {
    const invalidBlog = {
      likes: 2
    };
    
    await api
      .post('/api/blogs')
      .send(invalidBlog)
      .expect(400);
    
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length);
  });
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);
    
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd.length).toBe( blogsAtStart.length - 1 );

    const contents = blogsAtEnd.map(r => r.title);
    expect(contents).not.toContain(blogToDelete.title);
  });
});

describe('updating of a blog', () => {
  test('succeeds with status code of __ if valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const targetLike = blogToUpdate.likes;
    blogToUpdate.likes = blogToUpdate.likes + 1;

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200);
    
    const blogsAtEnd = await helper.blogsInDb();    
    expect(targetLike + 1).toBe( blogsAtStart[0].likes );
  });
});

describe('when there is initially one user in the db', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = new User({ username: 'root', password: 'secret'});
    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'myDooood',
      name: 'My Doooood',
      password: 'superSerial'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  });
});

afterAll(() => {
  mongoose.connection.close();
});

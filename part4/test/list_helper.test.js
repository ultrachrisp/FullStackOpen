const listHelper = require('../utils/list_helper');
const helper = require('./test_helper');

test('dummy returns one', () => {
  const result = listHelper.dummy([]);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });
  
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(helper.singleBlog);
    expect(result).toBe(2);
  });

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(helper.initialBlogs);
    expect(result).toBe(36);
  });
});

describe('favoriteBlog', () => {
  test('of empty list is undefined', () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toBe(undefined);
  });

  test('when list only has one entry', () => {
    const expected = {
    title: "Why Clojure",
    author: "Robert C. Martin",
    likes: 2
    };
    
    const result = listHelper.favoriteBlog(helper.singleBlog);
    expect(result).toEqual(expected);
  });

  test('of a bigger list', () => {
    const expected = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    };
    
    const result = listHelper.favoriteBlog(helper.initialBlogs);
    expect(result).toEqual(expected);
  });
});

describe('mostBlogs', () => {
  test('of empty list is undefined', () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toBe(undefined);
  });

  test('when list only has one entry', () => {
    const expected = {
      author: "Robert C. Martin",
      blogs: 1
    };
    
    const result = listHelper.mostBlogs(helper.singleBlog);
    expect(result).toEqual(expected);
  });

  test('of a bigger list', () => {
    const expected = {
      author: "Robert C. Martin",
      blogs: 3
    };
    
    const result = listHelper.mostBlogs(helper.initialBlogs);
    expect(result).toEqual(expected);
  });
});

describe('mostLikes', () => {
  test('of empty list is undefined', () => {
    const result = listHelper.mostLikes([]);
    expect(result).toBe(undefined);
  });

  test('when list only has one entry', () => {
    const expected = {
      author: "Robert C. Martin",
      likes: 2
    };
    
    const result = listHelper.mostLikes(helper.singleBlog);
    expect(result).toEqual(expected);
  });

  test('of a bigger list', () => {
    const expected = {
      author: "Edsger W. Dijkstra",
      likes: 17
    };
    
    const result = listHelper.mostLikes(helper.initialBlogs);
    expect(result).toEqual(expected);
  });
});

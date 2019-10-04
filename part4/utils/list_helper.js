const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if(blogs.length === 0) return undefined;
  
  const result = blogs.reduce((max, blog) => (max.likes > blog.likes)? max : blog);
  return {
    title: result.title,
    author: result.author,
    likes: result.likes
  };
};

// Possible DRY solution, but it doesn't help readability
// const reduceEntries = (list, param1, param2) => {
//     return [...list.reduce((mp, blog) => {
//       if (!mp.has(blog[param1])) mp.set(blog[param1], {[param1]: blog[param1], [param2]:0});
//     mp.get(blog.author)[param2]++;
//     return mp;
//   }, new Map).values()];
// };

const mostBlogs = (blogs) => {
  if(blogs.length === 0) return undefined;
  
  const result = [...blogs.reduce((mp, blog) => {
    if (!mp.has(blog.author)) mp.set(blog.author, { author: blog.author, count: 0 });
    mp.get(blog.author).count++;
    return mp;
  }, new Map).values()];
  // const result = reduceEntries(blogs, 'author', 'count');

  const max = result.reduce((max, result) => (max.count > result.count)? max : result);
  
  return {
    author: max.author,
    blogs: max.count
  };
};

const mostLikes = (blogs) => {
  if(blogs.length === 0) return undefined;
  
  const result = [...blogs.reduce((mp, blog) => {
    if (!mp.has(blog.author)) mp.set(blog.author, { author: blog.author, likes: 0 });
    mp.get(blog.author).likes += blog.likes;
    return mp;
  }, new Map).values()];

  const max = result.reduce((max, result) => (max.likes > result.likes)? max : result);
  
  return {
    author: max.author,
    likes: max.likes
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};

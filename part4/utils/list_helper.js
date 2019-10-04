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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};

const blogs = [
  {
    likes: 5,
    user: [
      {
        username: 'ChrispGuy',
        name: 'Chrisp',
        id: '5db188dbfaa2fa3ac5608b07'
      }
    ],
    title: 'Test blog alpha',
    author: 'JoeKickass',
    url: 'asdfasdfasd',
    id: '5db2cefbb1f33f1e5e24247a'
  },
  {
    likes: 4,
    user: [
      {
        username: 'ChrispGuy',
        name: 'Chrisp',
        id: '5db188dbfaa2fa3ac5608b07'
      }
    ],
    title: 'Test blog beta',
    author: 'Was added',
    url: 'over here',
    id: '5dbc08576f74d4144f4da2da'
  }
];

// const setToken = newToken => {
//   const token = `bearer ${newToken}`;
// };

const setToken = () => {};

const getAll = () => {
  return Promise.resolve(blogs);
};

export default { getAll, setToken };

import axios from 'axios';

const baseURL = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const create = async content => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseURL, object);
  return response.data;
};

const update = async content => {
  const response = await axios.put(`${baseURL}/${content.id}`, content);
  return response.data;
};

export default {
  getAll,
  create,
  update
};

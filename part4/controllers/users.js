const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users.map(u => u.toJSON()));
});

usersRouter.post('/', async (request, response, next) => {
  try{
    const { body } = request,
          saltRounds = 10,
          passowrdHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    });

    const savedUser = await user.save();
    response.json(savedUser);
  } catch (exception) { next(exception); }
});

module.exports = usersRouter;

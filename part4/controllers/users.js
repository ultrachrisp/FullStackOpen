const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User
        .find({})
        .populate('blogs', {url: 1, likes: 1});
  
  response.json(users.map(u => u.toJSON()));
});

usersRouter.post('/', async (request, response, next) => {
  try{
    const { body } = request,
          saltRounds = 10;
    console.log(body.password,' ',saltRounds);
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

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

const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
require('express-async-errors')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
  })
  res.json(users)
})

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return res.status(400).json({
      error: 'username must be unique',
    })
  }

  if (password.length < 3) {
    return res.status(400).json({
      error: 'password should be at least 3 characters long.',
    })
  }
  const saltRounds = 16
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })
  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

usersRouter.put('/:id', async (req, res, next) => {
  const body = req.body
  const user = {
    blogs: body.blogs,
  }
  await User.findByIdAndUpdate(req.params.id, user, {
    new: true,
    runValidators: true,
    context: 'query',
  })
  res.status(204).end()
})

usersRouter.delete('/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    await User.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } else {
    res.status(404).end()
  }
})

module.exports = usersRouter

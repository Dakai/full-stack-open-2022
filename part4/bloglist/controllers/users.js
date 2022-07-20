const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
require('express-async-errors')

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

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

usersRouter.delete('/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  //const blogs = await Blog.find({})
  //const blog = blogs.find((blog) => blog.id === req.params.id)
  if (user) {
    await User.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } else {
    res.status(404).end()
  }
})

module.exports = usersRouter
/*
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res, next) => {
  const blog = await Blog.findById(req.params.id)
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

blogsRouter.post('/', async (req, res, next) => {
  const body = req.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })
  const saveBlog = await blog.save()
  res.status(201).json(saveBlog)
})

blogsRouter.delete('/:id', async (req, res, next) => {
  const blog = await Blog.findById(req.params.id)
  //const blogs = await Blog.find({})
  //const blog = blogs.find((blog) => blog.id === req.params.id)
  if (blog) {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } else {
    res.status(404).end()
  }
})

blogsRouter.put('/:id', async (req, res, next) => {
  const body = req.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
    runValidators: true,
    context: 'query',
  })
  //const blogs = await Blog.find({})
  //const blog = blogs.find((blog) => blog.id === req.params.id)
  res.status(204).end()
})

module.exports = blogsRouter
*/

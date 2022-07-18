const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

require('express-async-errors')

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
  const user = await User.findById(body.userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  res.status(201).json(savedBlog)
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

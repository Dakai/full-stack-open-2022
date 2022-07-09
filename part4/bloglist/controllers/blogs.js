const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (blog) {
      res.json(blog)
    } else {
      res.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
  /*
  Blog.findById(req.params.id)
    .then((blog) => {
      if (blog) {
        res.json(blog)
      } else {
        res.status(404).end()
      }
    })
		.catch((error) => next(error))
		*/
})

blogsRouter.post('/', (req, res, next) => {
  const body = req.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })
  blog
    .save()
    .then((saveBlog) => {
      res.status(201).json(saveBlog)
    })
    .catch((error) => next(error))
})

module.exports = blogsRouter

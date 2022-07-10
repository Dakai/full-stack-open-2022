const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
}, 100000)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the first blog author is Leeory Jenkins', async () => {
  const response = await api.get('/api/blogs')

  const authors = response.body.map((r) => r.author)
  expect(authors).toContain('Leeory Jenkins')

  //expect(response.body[0].author).toBe('Leeory Jenkins')
})

//exercise 4.10
test('a valid blog can be added', async () => {
  const newBlog = {
    title: '治大国如烙大饼',
    author: '一个小学生',
    url: 'nourl',
    likes: 0,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const res = await api.get('/api/blogs')
  const author = res.body.map((r) => r.author)
  expect(res.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(author).toContain('一个小学生')
})

afterAll(() => {
  mongoose.connection.close()
})

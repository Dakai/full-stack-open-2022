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

test('verify the unique id property exsits', async () => {
  const response = await api.get('/api/blogs')
  const ids = response.body.map((r) => r.id)
  expect(ids[0]).toBeDefined()
}, 100000)

afterAll(() => {
  mongoose.connection.close()
})

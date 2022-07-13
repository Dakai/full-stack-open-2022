const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  /*
  console.log('cleared')
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
    console.log('saved')
  }
  /*
  helper.initialBlogs.forEach(async (blog) => {
    let blogObject = new Blog(blog)
    await blogObject.save()
    console.log('saved')
	})
  console.log('done')
	*/
}, 100000)

describe('when there is initially blogs saved', () => {
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
  test('verify the unique id property exsits', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map((r) => r.id)
    expect(ids[0]).toBeDefined()
  }, 100000)
})
//exercise 4.10

describe('addition of a new note', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: '治大国如烙大饼',
      author: '一个小学生',
      url: 'nourl',
      likes: 0,
    }

    await api.post('/api/blogs').send(newBlog)

    const res = await api.get('/api/blogs')
    const author = res.body.map((r) => r.author)
    expect(res.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(author).toContain('一个小学生')
  })

  //exercise 4.11
  test('verify property likes default to 0 if missing', async () => {
    const newBlog = {
      title: '治大国如烙大饼',
      author: '徐俊平',
      url: 'none',
    }

    await api.post('/api/blogs').send(newBlog)

    const res = await api.get('/api/blogs')
    const likes = res.body.map((r) => r.likes)
    expect(likes[2]).toBe(0)
  })

  test('blog without title is not to be saved', async () => {
    const newBlog = {
      author: '徐俊平',
      url: 'none',
    }
    await api.post('/api/blogs').send(newBlog).expect(400)
    const res = await api.get('/api/blogs')
    //const authors = res.body.map((r) => r.author)
    expect(res.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blog without url is not to be saved', async () => {
    const newBlog = {
      author: '徐俊平',
    }
    await api.post('/api/blogs').send(newBlog).expect(400)
    const res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(helper.initialBlogs.length)
  })
})
describe('deletion of a blog', () => {
  test('delete blog with id and correct response for nonexistent id ', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map((r) => r.id)
    const id = ids[0]
    console.log('ids[0]', id)
    await api.delete(`/api/blogs/${id}`).expect(204)
    await api.delete(`/api/blogs/${id}`).expect(404)
  })
})

describe('update of a blog', () => {
  test('verify the functionality of updating an individual blog ', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map((r) => r.id)
    const id = ids[1]
    console.log('ids[1]', id)
    const newBlog = {
      title: '维尼熊的治国理政方略',
      author: '徐俊平',
      url: 'none',
      likes: '1024',
    }
    await api.put(`/api/blogs/${id}`).send(newBlog).expect(204)
  })
})
afterAll(() => {
  mongoose.connection.close()
})

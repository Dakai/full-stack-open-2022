const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithNoBlog = []
  test('of empty list is zero', () => {
    expect(listHelper.totallikes(listWithNoBlog)).toBe(0)
  })

  const listWithOneBlog = [
    {
      title: 'nobook',
      author: 'nobody',
      url: 'nourl',
      likes: 123,
    },
  ]
  test('when list has only one blog equals the likes of that', () => {
    expect(listHelper.totallikes(listWithOneBlog)).toBe(123)
  })

  const listWithMultiBlog = [
    {
      title: 'nobook',
      author: 'nobody',
      url: 'nourl',
      likes: 123,
    },
    {
      title: 'nobook1',
      author: 'nobody',
      url: 'nourl',
      likes: 123,
    },
    {
      title: 'nobook2',
      author: 'nobody',
      url: 'nourl',
      likes: 123,
    },
  ]
  test('of a bigger list is calculated right', () => {
    expect(listHelper.totallikes(listWithMultiBlog)).toBe(369)
  })
})

describe('favorite blog', () => {
  const listWithMultiBlogs = [
    {
      _id: '25a422aa71b54a676234d17f8',
      title: 'nobook',
      author: 'nobody',
      url: 'nourl',
      likes: 12,
    },
    {
      _id: '25a422aa71b54a676223417f8',
      title: 'nobook1',
      author: 'nobody',
      url: 'nourl',
      likes: 13,
    },
    {
      _id: '25a422aa71b54a676234d17234',
      title: 'nobook2',
      author: 'nobody',
      url: 'nourl',
      likes: 123,
    },
  ]
  const favorite = {
    _id: '25a422aa71b54a676234d17234',
    title: 'nobook2',
    author: 'nobody',
    url: 'nourl',
    likes: 123,
  }
  test('of a bigger list finds the most likes blog', () => {
    expect(listHelper.favoriteBlog(listWithMultiBlogs)).toEqual(favorite)
  })
})

describe('most blogs author', () => {
  const multiBlogs = [
    {
      _id: '25a422aa71b54a676234d170f8',
      title: 'nobook',
      author: 'nobody',
      url: 'nourl',
      likes: 12,
    },
    {
      _id: '25a422aa71b54a6762234172f8',
      title: 'nobook1',
      author: 'nobody',
      url: 'nourl',
      likes: 13,
    },
    {
      _id: '25a422aa71b54a676234d17234',
      title: 'nobook2',
      author: 'oddyssius',
      url: 'nourl',
      likes: 123,
    },
    {
      _id: '25a422aa71b54a676232a32b7234',
      title: 'oddyssey',
      author: 'oddyssius',
      url: 'nourl',
      likes: 123,
    },
    {
      _id: '25a422aa71b54a2342323237234',
      title: 'oddyssey volume 1',
      author: 'oddyssius',
      url: 'nourl',
      likes: 123,
    },
  ]
  const author = {
    author: 'oddyssius',
    blogs: 3,
  }
  test('of a bigger list finds the author with the most blogs', () => {
    expect(listHelper.mostBlogs(multiBlogs)).toEqual(author)
  })
})

describe('most likes author', () => {
  const multiBlogs = [
    {
      _id: '25a422aa71b54a676234d17234',
      title: 'nobook2',
      author: 'oddyssius',
      url: 'nourl',
      likes: 123,
    },
    {
      _id: '25a422aa71b54a676232a32b7234',
      title: 'oddyssey',
      author: 'oddyssius',
      url: 'nourl',
      likes: 123,
    },
    {
      _id: '25a422aa71b54a2342323237234',
      title: 'oddyssey volume 1',
      author: 'oddyssius',
      url: 'nourl',
      likes: 123,
    },
    {
      _id: '25a422aa71b54a676234d170f8',
      title: 'nobook',
      author: 'nobody',
      url: 'nourl',
      likes: 12,
    },
    {
      _id: '25a422aa71b54a6762234172f8',
      title: 'nobook1',
      author: 'nobody',
      url: 'nourl',
      likes: 13,
    },
  ]
  const author = {
    author: 'oddyssius',
    likes: 369,
  }
  test.only('of a bigger list finds the author with the most likes', () => {
    expect(listHelper.mostLikes(multiBlogs)).toEqual(author)
  })
})

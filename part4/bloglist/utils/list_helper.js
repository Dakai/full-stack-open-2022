const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totallikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.sort((a, b) => {
    return b['likes'] - a['likes']
  })[0]
}

const mostBlogs = (blogs) => {
  const count = lodash.countBy(blogs.flatMap((blog) => blog.author))
  const author = lodash.max(Object.keys(count), (o) => count[o])
  const blogCount = count[author]
  const result = {
    author: author,
    blogs: blogCount,
  }
  return result
}
const mostLikes = (blogs) => {
  let result = []
  let max_likes = 0
  const authors = [...new Set(blogs.flatMap((blog) => blog.author))]
  authors.find((author) => {
    let likes = lodash
      .chain(blogs)
      .flatten()
      .filter({ author: author })
      .sumBy('likes')
      .value()
    if (likes >= max_likes) {
      max_likes = likes
      result = { author: author, likes: max_likes }
    }
    //let obj_likes = { author: author, likes: likes }
    //result.push(obj_likes)
  })
  //console.log(result)
  return result
  /*
  const result = {
    author: author,
    likes: blogCount,
  }
	return result*/
}

module.exports = {
  dummy,
  totallikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}

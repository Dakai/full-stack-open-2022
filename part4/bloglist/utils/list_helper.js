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
  return blogs.sort(function (a, b) {
    //console.log('a likes', a['likes'])
    //console.log('b likes', b['likes'])
    return b['likes'] - a['likes']
  })[0]
}

module.exports = {
  dummy,
  totallikes,
  favoriteBlog,
}

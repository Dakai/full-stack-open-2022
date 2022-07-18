//const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'How to do raids properly',
    author: 'Leeory Jenkins',
    url: 'nourl',
    likes: 13,
  },
  {
    title: 'nobook1',
    author: 'nobody',
    url: 'nourl',
    likes: 12,
  },
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}
module.exports = {
  initialBlogs,
  usersInDb,
}

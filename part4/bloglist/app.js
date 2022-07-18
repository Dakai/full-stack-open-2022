const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to ', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connceted to MongoDB')
  })
  .catch((error) => {
    logger.error('error connceting to MongoDB', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requireLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

/*require('dotenv').config()
const app = express()
const logger = require('./utils/logger')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

app.get('/', (res) => {
  res.send('<h1>Hello World!</h1>')
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

*/

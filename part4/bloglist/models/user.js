const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'username can not be empty'],
    minLength: [3, 'username must be at least three characters long'],
  },
  name: String,
  passwordHash: String,
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
})

userSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString()
    delete returnObject._id
    delete returnObject.__v
    // the passwordHash should not be revealed
    delete returnObject.passwordHash
  },
})

//module.exports = mongoose.model('Blog', blogSchema)
const User = mongoose.model('User', userSchema)
module.exports = User

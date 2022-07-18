const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: String,
  passwordHash: String,
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
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


const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username:String,
    first_name:String,
    last_name:String,
    orders:[
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Item'
        }
      ],
    password_hash: String,
})


userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.passwordHash
    }
  })

module.exports = mongoose.model('User', userSchema)


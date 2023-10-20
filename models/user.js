
const mongoose = require('mongoose')
//const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username:String,
    
    /*{
      type: String,
      required: true,
      unique: true
    },*/
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

  //userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)


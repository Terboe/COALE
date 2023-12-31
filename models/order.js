

const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    status:{
      type:String,
      default: "Pending"
    },
    item:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required:true
      },
    quantity:Number,
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
      }
})


orderSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })


module.exports = mongoose.model('Order' , orderSchema)
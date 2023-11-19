
const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: {
      type: String,
      maxlength: 40,
      required:true
    },
    description:{
      type: String,
      maxlength: 200,
      required:true
    },
    orders_needed:{
      type: Number,
      min: 1,
      max: 100000000000,
      required:true
    },
    orders_now:{
      type:Number,
      default: 0
    },
    price: {
      type:Number,
      min:0,
      required:true
    },
    URL: {
      type:String
    },
    start_date: {type:Date , default: Date.now},
    end_date: {
      type:Date,
      required:true
    },

    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
      }
    ],
    photoURL: {type: String, default: "https://upload.wikimedia.org/wikipedia/commons/1/10/Banana_isolated_on_white.jpg"},
    sorting_tags: {type: [String] , default:[]}
  })


  itemSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })


  module.exports = mongoose.model('Item', itemSchema)
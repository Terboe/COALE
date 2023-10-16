
const mongoose = require('mongoose')


const url = process.env.MONGODB_URL

mongoose.set('strictQuery', false)
console.log("connecting to database")
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })



const itemSchema = new mongoose.Schema({
    name: String,
    category:String,
    description: String,
    orders_needed: Number,
    orders_now: {type:Number, default: 0},
    price: Number,
    URL: String,
    start_date: {type:Date , default: Date.now},
    end_date: Date,
    //FIX THIS!
    orders: {type:[String], default: []},
    photoURL: {type: String, default: "https://upload.wikimedia.org/wikipedia/commons/1/10/Banana_isolated_on_white.jpg"}
  })


  itemSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })


  module.exports = mongoose.model('Item', itemSchema)



const http = require('http')
const express = require('express')
const morgan = require('morgan')
const { token } = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')


/*const url =
  `sthsth${password}sthsth`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  orders_needed: Number,
  orders_now: Number,
  price: Number,
  URL: String,
  start_date: Date,
  end_date: Date,
  customers: [userSchema._id]
})

const userSchema = new mongoose.Schema({
    name:String,
    orders: [itemSchema],
    password: String,
    cash: Number
})


const Item = mongoose.model('Item', itemSchema)
const User = mongoose.model('User' , userSchema)
*/
const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan(function (tokens, req, res) {
  ret = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms --- '
  ].join(' ')
  if(tokens.method(req,res).toLowerCase() === 'post'){
    return(ret.concat(JSON.stringify(req.body)))
  }
  return (ret)
  }))



// Get all

app.get('/items' , (req,res) => {
  res.status(404).end()

  Item.find({}).then(items => {
    res.json(items)
    mongoose.connection.close()
  })
})

app.get('/users' , (req,res) => {

    User.find({}).then(users => {
      res.json(users)
      mongoose.connection.close()
    })
  })

  // Get one by id NOT FINISHED TODO ALSO FOR USERS

  app.get('/items/:id' , (req,res) => {
    const id = Number(req.params.id)
    Item.find({}).then(items => {
      res.json(items)
      mongoose.connection.close()
    })
  })

  // Create new items TODO ALSO FOR ITEMS
  app.post('/users' , (req,res) => {
  })

  //delete single resources TODO ALSO FOR USERS

  app.delete('/items/:id' , (req,res) => {

  })

  // TODO =!?!!?!?!??!? PUT AND PATCH =!=!=!=!=)!))!)!?!?!?
  
 

app.get('/api/info',   (req,res) => {
    const kontsa = `<p> Phonebook has ${persons.length} people</p> <p>${new Date()}</p>`
    res.send(kontsa)
})

const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

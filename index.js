


const http = require('http')
const express = require('express')
const morgan = require('morgan')
const { token } = require('morgan')
const cors = require('cors')
require('dotenv').config()
const testitems = require('./testItems')
const Item = require('./models/item')
const Order = require('./models/order')
const User = require('./models/user')
const bcrypt = require('bcrypt')
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

app.get('/api/items' , (req,res) => {
  Item.find({}).then(items => {
    res.json(items)
  })
})

app.get('/api/users' , (req,res) => {
    User.find({}).then(users => {
      res.json(users)
    })
  })

  // Get one by id NOT FINISHED TODO ALSO FOR USERS

  app.get('/api/items/:id' , (req,res) => {
    Item.find({id:req.params.id}).then(items => {
      res.json(items)
    })
  })

  app.get('/api/users/:id' , (req,res) => {
    User.find({id:req.params.id}).then(users => {
      res.json(users)
    })
  })


  // Create new items TODO ALSO FOR ITEMS
  app.post('/api/items', (req, res) => {
    const body = req.body
    if (body.name === undefined) {
      return res.status(400).json({ error: 'content missing' })
    }
  
    const item = new Item({
      name: body.name,
      category: body.category,
      description: body.description,
      orders_needed: body.orders_needed,
      price:body.price,
      URL: body.URL,
      end_date: body.end_date
    })
    
    item.save().then(savedItem => {
      res.json(savedItem)
    })
  })

  app.post('/api/users', async (req, res) => {
    const body = req.body
    if (body.username === undefined) {
      return res.status(400).json({ error: 'content missing' })
    }
    const saltrounds = 10
    const pswhash = await bcrypt.hash(body.password,saltrounds)


    const user = new User({
      username:body.username,
      first_name:body.first_name,
      last_name:body.last_name,
      password_hash: pswhash,
  })
    
    user.save().then(savedUser => {
      res.json(savedUser)
    })
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

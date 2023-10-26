


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
const jwt = require('jsonwebtoken')

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


  const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '')
    }
    return null
  }

  app.post('/api/login', async (request, response) => {
    const { username, password } = request.body
  
    const user = await User.findOne({ username })
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.password_hash)
  
    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password'
      })
    }
  
    const userForToken = {
      username: user.username,
      id: user.id,
    }
  
    const token = jwt.sign(userForToken, process.env.SECRET, {expiresIn: 60*60 })
  
    response
      .status(200)
      .send({ token, username: user.username, name: user.name, })
  })



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

  app.get('/api/categories/:category' , (req,res) => {
    console.log(req.params.category)
    Item.find({ sorting_tags: { $in: [req.params.category] } }).then(items => {
      res.json(items)
    })
  })

  app.get('/api/items/search/:searchword', (req,res) => {
    Item.find({ name: { $regex: new RegExp(req.params.searchword, "i") } }).then(items => {
      res.json(items)
    })
  })



  app.get('/api/users/:id' , (req,res) => {
    User.find({id:req.params.id}).then(users => {
      res.json(users)
    })
  })

  app.post('/api/orders/:itemid', async (req, res) => {

    const body = req.body

    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (body.quantity === undefined) {
      return res.status(400).json({ error: 'content missing' })
    }
  
    const order = new Order({
      item:req.params.itemid,
      quantity:body.quantity
    })
    orderedItem = await Item.findById(req.params.itemid)
    orderedItem.orders.concat(order.id)
    orderedItem.orders_now = orderedItem.orders_now + body.quantity
    await orderedItem.save()
    order.save().then(savedOrder => {
      res.json(savedOrder)
    })
  })


  // Create new items TODO ALSO FOR ITEMS
  app.post('/api/items', async (req, res) => {
    const body = req.body

    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

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
      end_date: body.end_date,
      sorting_tags:body.sorting_tags
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

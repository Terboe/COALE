const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/' , (req,res) => {
    User.find({}).then(users => {
      res.json(users)
    })
})

usersRouter.get('/api/users/:id' , (req,res) => {
    User.find({id:req.params.id}).then(users => {
      res.json(users)
    })
})

usersRouter.post('/api/users', async (req, res) => {
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

module.exports = usersRouter
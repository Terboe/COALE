
const itemsRouter = require('express').Router()
const Item = require('../models/item')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null

}


itemsRouter.get('/' , (req,res ) => {
    Item.find({}).then(items => {
      res.json(items)
    })
})

itemsRouter.get('/:id' , (req,res ) => {
    if(req.params.id.length != 24){
      return res.status(400).json({error: "inproper item id"})
    }
    Item.findOne({_id:req.params.id}).then(items => {
      if(items){
        res.json(items)
      }else{
        res.status(404).end()
      }
    })
})

itemsRouter.get('/search/:searchword', (req,res ) => {
    Item.find({ name: { $regex: new RegExp(req.params.searchword, "i") } }).then(items => {
      res.json(items)
    })
})

/*itemsRouter.delete('/:id', (request, response) => {
    Item.findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
})*/

itemsRouter.post('/', async (req, res,next) => {
    const body = req.body
    let decodedToken = null
   
    if(getTokenFrom(req)){
      try{
      decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
      } catch(error){
        next(error)
        return

      }
    }
    if (!decodedToken || !decodedToken.id) {
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

//NEEDS TO BE FIXED to frontend and indexpage!!!!
itemsRouter.get('/categories/:category' , (req,res) => {
    console.log(req.params.category)
    Item.find({ sorting_tags: { $in: [req.params.category] } }).then(items => {
      res.json(items)
    })
  })


module.exports = itemsRouter
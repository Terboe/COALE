const ordersRouter = require('express').Router()
const Order = require('../models/order')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const Item = require('../models/item')
const order = require('../models/order')
const user = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null

}
ordersRouter.delete('/:orderid' , async(req,res,next) => {
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
  
  const order = await Order.findById(req.params.orderid)
  console.log(order.user_id , decodedToken.id)
  if(order.user_id == decodedToken.id){
    const order = await Order.findById(req.params.orderid)
    if(order.status != 'Pending'){
      return res.status(400).json({error: "the order has already been delivered"})
    }
    if(order.user_id == decodedToken.id){
      const item = await Item.findById(order.item)
      const user = await User.findById(order.user_id)
      item.orders = item.orders.filter(ord => ord != req.params.orderid)
      item.orders_now = item.orders_now - order.quantity
      await item.save()
      user.orders = user.orders.filter(ord => ord != order.id)
      await user.save()
      await Order.deleteOne({_id: order.id})
      return res.status(200).json({message: "deletion successfull"})
    }


  }else{
    return res.status(401).json({error: 'not ordered by user'})
  }
})

ordersRouter.post('/', async (req, res, next) => {

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
  const user = await User.findOne({_id:decodedToken.id})
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
 
  if ( !body.content[0] || body.content[0].quantity == undefined) {
    return res.status(400).json({ error: 'content missing' })
  }
  const errs = []

const addOrder = async ord => {

    orderedItem = await Item.findById(ord.itemid)

    if(!orderedItem){
      errs.concat({itemid: ord.itemid, error: "Item not found"})
      return
    }

    const order = new Order({
      item:ord.itemid,
      quantity:ord.quantity,
      user_id: decodedToken.id
    })

    orderedItem.orders = orderedItem.orders.concat(order.id)
    orderedItem.orders_now = orderedItem.orders_now + ord.quantity
    await orderedItem.save()
    user.orders = user.orders.concat(order._id)
    await order.save()
    return
  }

  body.content.forEach(async obj => {
    await addOrder(obj)
  })
  await user.save()
  if(errs.length == 0){
    return res.status(200).json({message: "all items ordered"})
  }else{
    return res.status(400).json({errors:errs})
  }

  })


module.exports = ordersRouter

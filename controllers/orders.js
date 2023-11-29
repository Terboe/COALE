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

ordersRouter.get('/' , async (req,res,next) => {
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
  if(!user || !user.id){
    return res.status(404).json({error: "user not found"})
  }
  const orders = await Order.find({_id: {$in: user.orders}})
  const retobj = []
  if(!orders || orders.length == 0){
    return res.status(404).json({error:"can't find orders"})
  }
  for (const ord of orders){
    const it = await Item.findById(ord.item)
    retobj.push({
      orderid: ord.id,
      userid: ord.user_id,
      quantity: ord.quantity,
      item: it
    })  
  }
  return res.status(200).json({orders:retobj})
})

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
  if(order.user_id == decodedToken.id){
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
  const user = await User.findOne({_id:decodedToken.id})
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
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
    user.orders = user.orders.concat(order.id)
    await order.save()
    await user.save()
    return
  }

  for (const obj of body.content) {
    await addOrder(obj)
  }
  if(errs.length == 0){
    return res.status(200).json({message: "all items ordered"})
  }else{
    return res.status(400).json({errors:errs})
  }

  })


module.exports = ordersRouter

require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URL = process.env.MONGODB_URL
let SECRET = process.env.SECRET

module.exports = {
  MONGODB_URL,
  PORT,
  SECRET
}
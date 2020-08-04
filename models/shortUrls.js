const mongoose = require('mongoose')
const shortId = require('shortid')
shortId.generate()
const Schema = mongoose.Schema

const shortUrlSchema = new Schema({
  full: {
      type: String,
      required: true
  },
  short: {
      type: String,
      required: true,
      default: shortId.generate
  },
  clicks: {
      type: Number,
      required: true,
      default: 0
  } 
})
module.exports = mongoose.model('ShortUrl', shortUrlSchema)
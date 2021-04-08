const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  const blogs = await Blog.find({})


  response.status(204).end()
})

module.exports = router
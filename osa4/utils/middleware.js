const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const requestLogger = (request,response,next) => {
  logger.info('Method:',request.method)
  logger.info('Path:  ',request.path)
  logger.info('Body:  ',request.body)
  logger.info('---')
  next()
}

const tokenExtractor = (request,response,next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

const userExtractor = async(request,response,next)=>{
  console.log(request.body)
  console.log(`.token: ${request.token}`)
  const decoded = jwt.verify(request.token,process.env.SECRET)
  console.log(`decoded : ${decoded.id}`)
  const user = await User.findById(decoded.id)
  console.log(`Found : ${user}`)
  request.user = user;
  next()
}

const unknownEndpoint = (request,response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error,request,response,next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}
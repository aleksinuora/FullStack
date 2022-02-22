const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.username) {
    return response.status(400).json({
      error: 'Expected `user` to be defined'
    })
  }

  if (!body.password) {
    return response.status(400).json({
      error: 'Expected `password` to be defined'
    })
  }

  if (body.username.length < 3) {
    return response.status(400).json({
      error: 'Expected `username` to be at least 3 characters long'
    })
  }

  if (body.password.length < 3) {
    return response.status(400).json({
      error: 'Expected `password` to be at least 3 characters long'
    })
  }

  const users = await User.find({})
  
  users.map(u => {
    if (u.username === body.username) {
      return response.status(400).json({
        error: 'Expected a unique username'
      })
    }
  })

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1})
  response.json(users.map(user => user.toJSON()))
})

module.exports = usersRouter
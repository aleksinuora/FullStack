const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
    logger.dbug('gettaillaan blogit...')
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog
        .findById(request.params.id).populate('user', { username: 1, name:1 })
    if (blog) {
        response.json(blog.toJSON())
    } else {
        response.status(404).end()
    }
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body
/*    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)*/
 
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: request.user._id
    })
    if (!blog.title) {
        response.status(400).end()
    } else if (!blog.url) {
        response.status(400).end()
    } else {
        const savedBlog = await blog.save()
        request.user.blogs = request.user.blogs.concat(savedBlog._id)
        await request.user.save()
        response.json(blog.toJSON())
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    logger.dbug('yritetään poistaa', request.params.id)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const blog = await Blog.findById(request.params.id)

    if (!blog) return response.status(204).end()

    logger.dbug(decodedToken.id, blog.user.toString())

    if (!request.token || (!decodedToken.id || (blog.user.toString() !== decodedToken.id))) {
        return response.status(401).json({ error: 'token missing or invalid' })
    } else {
        const result = await Blog.findByIdAndRemove(request.params.id)
        logger.dbug('poistettiin arvo', result)
        response.status(204).end()
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper.js')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

let token

beforeEach(async () =>{   
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('salasana', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save() 

    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    const userLogin = {
      username: 'root',
      password: 'salasana'
    }
    const response = await api
      .post('/api/login')
      .send(userLogin)
    
    token = response.body.token;
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await helper.blogsInDB()

    expect(response).toHaveLength(helper.initialBlogs.length)
})

test('blogs are returned with correctly named id-field', async () => {
    const response = await helper.blogsInDB()

    expect(response[0].id).toBeDefined()
})

test('a new blog can be created', async () => {
    const newBlog = new Blog(helper.newBlogEntry)
    await newBlog.save()
    let response = await helper.blogsInDB()

    expect(response).toContainEqual(newBlog.toJSON())
})

test('a new blog defaults to 0 likes', async () => {
    const newBlog = new Blog({
        title: "Testing sucks",
        author: "Yo Mama",
        url: "hooteep.weew.com"
    })
    await newBlog.save()
    let response = await helper.blogsInDB()
    expect(response[helper.initialBlogs.length].likes).toEqual(0)
})

test('posting a new blog with a missing title returns \"400 Bad Request\"', async () => {
    const newBlog = new Blog({
        author: "Yo Mama's Mama",
        url: "hooteep.weew.com.gov.net",
    })
    let response = await api.post('/api/blogs/').send(newBlog).set('authorization', `bearer ${token}`)
    expect(response.status).toEqual(400)
})

test('posting a new blog with a missing url returns \"400 Bad Request\"', async () => {
    const newBlog = new Blog({
        title: "Here's Why Testing Sucks",
        author: "Yo Mama's Mama",
        userId: "123"
    })
    let response = await api.post('/api/blogs/').send(newBlog).set('authorization', `bearer ${token}`)
    expect(response.status).toEqual(400)
})

test('deleting a blog succeeds with status code 204 if id is valid', async () => {
    const blogs = await helper.blogsInDB()
    const blog = blogs[0]
    const response = await api.post('/api/blogs').set('authorization', `bearer ${token}`).send(blog)
    const id = response.body.id

    await api.delete(`/api/blogs/${id}`).set('authorization', `bearer ${token}`).expect(204)
})

test('a blog entry can be updated', async () => {
    const newBlog = new Blog(helper.newBlogEntry)
    const oldLikes = helper.newBlogEntry.likes
    const newLikes = oldLikes + 1
    await newBlog.save()
    const updatedBlog = new Blog({...helper.newBlogEntry, likes: newLikes})
    const id = helper.newBlogEntry._id
    await api.put(`/api/blogs/${id}`).send(updatedBlog.toJSON())
    let result = await api.get(`/api/blogs/${id}`)
    expect(result.body.likes).toEqual(newLikes)
})

afterAll(() => {
    mongoose.connection.close()
})
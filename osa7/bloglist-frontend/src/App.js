import React, { useState, useEffect, useRef, useReducer } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import Create from './components/Create'
import Togglable from './components/Togglable'
import Users from './components/Users'
import blogService from './services/blogs'
import loginService from './services/login'
import MessageContext from './MessageContext'

const messageTypeReducer = (state, action) => {
  return action.success
}

const messageReducer = (state, action) => {
  return action.message
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [eventMessage, eventMessageDispatch] = useReducer(messageReducer, null)
  const [messageType, messageTypeDispatch] = useReducer(
    messageTypeReducer,
    true
  )

  const blogFormRef = useRef()

  const sortByLikes = (blogsToSort) => {
    const sortedBlogs = blogsToSort.sort((a, b) => b.likes - a.likes)
    return sortedBlogs
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      flashMessage(`${user.name} successfully logged in`, true)
    } catch (exception) {
      flashMessage('wrong credentials', false)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    flashMessage('Logged out', true)
  }

  const flashMessage = (message, success) => {
    messageTypeDispatch({ success })
    eventMessageDispatch({ message })
    setTimeout(() => {
      eventMessageDispatch({ message: null })
    }, 3000)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    await blogService.create({ ...blogObject, user: user.id })
    const newBlogs = await blogService.getAll()
    setBlogs(sortByLikes(newBlogs))
    flashMessage(`Added '${blogObject.title}' to blog list`, true)
  }

  const addLike = async (blogObject) => {
    const newLikes = blogObject.likes + 1
    await blogService.update({ ...blogObject, likes: newLikes })
    const newBlogs = await blogService.getAll()
    setBlogs(sortByLikes(newBlogs))
  }

  const removeBlog = async (blogObject) => {
    await blogService.remove(blogObject)
    console.log(blogs)
    const newBlogs = await blogService.getAll()
    setBlogs(newBlogs)
    console.log(blogs)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(sortByLikes(blogs)))
  }, [])

  if (user === null) {
    return (
      <div>
        <h2>login</h2>
        <Login
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
        <MessageContext.Provider value={[eventMessage, eventMessageDispatch]}>
          <Notification success={messageType} />
        </MessageContext.Provider>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <MessageContext.Provider value={[eventMessage, eventMessageDispatch]}>
        <Notification success={messageType} />
      </MessageContext.Provider>
      <p>
        Currently logged in as {user.name}
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable
        id='newBlogForm-button'
        buttonLabel='new blog'
        ref={blogFormRef}
      >
        <Create addBlog={addBlog} />
      </Togglable>
      {blogs.map((blog) =>
        blog ? (
          <Blog
            key={blog.id}
            blog={blog}
            addLike={addLike}
            user={user}
            removeBlog={removeBlog}
          />
        ) : (
          <></>
        )
      )}
      <h2>Users</h2>
      <Users />
    </div>
  )
}

export default App

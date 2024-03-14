import React, { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog, user, onLike }) => {
  const [fullInfo, setFullInfo] = useState(false)

  onLike

  const handleLike = () => {
    addLike(blog)
    //testejä varten, älä välitä
    if (onLike) {
      onLike()
    }
  }

  const handleRemove = () => {
    if (window.confirm(`Remove '${blog.title}'?`)) removeBlog(blog)
  }

  let content = fullInfo
    ? <>
      <button onClick={() => setFullInfo(false)} >hide</button>
      <p>
        {blog.url}
      </p>
      <p>
        {blog.likes} <button onClick={handleLike}>like</button>
      </p>
      <p>
        {blog.user.name}
      </p>
      {(blog.user.name === user.name) ? <button onClick={handleRemove}>remove</button>
        : <></>
      }
    </>
    : <button onClick={() => setFullInfo(true)}>view</button>



  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      {content}
    </div>
  )
}

export default Blog
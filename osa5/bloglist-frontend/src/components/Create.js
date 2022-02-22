import React, { useState } from 'react'

const Create = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title: title,
        author: author,
        url: url,
      }
      addBlog(newBlog)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      console.error('Something went wrong while creating a new blog')
    }
  }

  return (
    <div>
      <h2>add a blog</h2>
      <form onSubmit={handleCreate}>
        <div>
                    title:
          <input
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
                    author:
          <input
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
                    url:
          <input
            id="url"
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create-button" type="submit">create</button>
      </form>

    </div>
  )
}

export default Create
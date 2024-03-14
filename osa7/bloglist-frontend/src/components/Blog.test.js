import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const newBlogEntry = {
  _id: '5a422b3a1b54a676234d17f9',
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  likes: 12,
  __v: 0,
  user: {
    name: 'Kalle'
  }
}

const user = {
  name: 'Kalle'
}

test('renders only blog title and author in the default view', () => {
  const component = render(
    <Blog blog={newBlogEntry} />
  )

  expect(component.container).toHaveTextContent(
    newBlogEntry.title,
    newBlogEntry.author
  )
  expect(component.container).not.toHaveTextContent(
    newBlogEntry.url,
    newBlogEntry.likes
  )
})

test('renders full blog info after `view` has been pressed', () => {
  const component = render(
    <Blog blog={newBlogEntry} user={user} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    newBlogEntry.title,
    newBlogEntry.author,
    newBlogEntry.url,
    newBlogEntry.user.name
  )
})

test('pressing the `like`-button twice calls the event handler twice', () => {
  const mockHandler = jest.fn()
  const mockLike = jest.fn()

  const component = render(
    <Blog blog={newBlogEntry} user={user} addLike={mockLike} onLike={mockHandler} />
  )

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Create from './Create'

/*
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
*/

test('<Create> calls addBlog when `submit`-button is pressed and fields have suitable values', () => {
  const addBlog = jest.fn()

  const component = render(
    <Create addBlog={addBlog} />
  )

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'Testinimi' }
  })
  fireEvent.change(authorInput, {
    target: { value: 'Testaaja' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'weew.dotslash.com' }
  })
  fireEvent.submit(form)

  console.log(addBlog.mock.calls[0][0])

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0]).toStrictEqual({ title: 'Testinimi', author: 'Testaaja', url: 'weew.dotslash.com' })
})
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/Login'
import Recommend from './components/Recommend'
import { BOOK_ADDED, ALL_BOOKS } from './queries.js'
import { useApolloClient, useSubscription } from '@apollo/client'

export const updateCache = (cache, query, addedBook) => {
  const uniqueByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqueByTitle(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const Notify = ({ errorMessage }) => {
    if (!errorMessage) {
      return null
    }
    return <div style={{ color: 'red' }}>{errorMessage}</div>
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      notify(`${addedBook.title} added`)

      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    },
  })

  const padding = {
    padding: 5,
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    console.log('logged out, token:', token)
    console.log('local storage:', localStorage)
  }

  const loginLink = token ? (
    <button onClick={logout}>logout</button>
  ) : (
    <Link style={{ padding: 5 }} to='/login'>
      login
    </Link>
  )

  return (
    <Router>
      <div>
        <Notify errorMessage={errorMessage} />
        <div>
          <Link style={padding} to='/authors'>
            authors
          </Link>
          <Link style={padding} to='/books'>
            books
          </Link>
          {token ? (
            <Link style={padding} to='/add'>
              add book
            </Link>
          ) : null}
          {token ? (
            <Link style={padding} to='/recommend'>
              recommend
            </Link>
          ) : null}
          {loginLink}
        </div>

        <Routes>
          <Route path='/' element={<Authors setError={notify} />} />
          <Route path='/authors' element={<Authors setError={notify} />} />
          <Route path='/books' element={<Books setError={notify} />} />
          <Route path='/add' element={<NewBook setError={notify} />} />
          <Route path='/recommend' element={<Recommend setError={notify} />} />
          <Route
            path='/login'
            element={<LoginForm setToken={setToken} setError={notify} />}
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App

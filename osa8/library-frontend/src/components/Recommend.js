import React from 'react'

import { useQuery } from '@apollo/client'

import { ALL_BOOKS, ME } from '../queries'

const Recommend = ({ setError }) => {
  const meRes = useQuery(ME, {
    fetchPolicy: 'no-cache',
  })
  const booksRes = useQuery(ALL_BOOKS)

  if (!localStorage.getItem('library-user-token')) {
    return null
  }

  if (booksRes.loading || meRes.loading) {
    return <div>loading...</div>
  }

  console.log(meRes.data.me)

  const favorite = meRes.data.me.favoriteGenre
  const filteredBooks = booksRes.data.allBooks.filter((book) => {
    return book.genres.includes(favorite)
  })

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend

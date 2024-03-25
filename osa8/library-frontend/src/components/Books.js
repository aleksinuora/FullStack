import { useQuery } from '@apollo/client'
import { useState } from 'react'

import { ALL_BOOKS } from '../queries'

const Books = ({ setError }) => {
  const [genre, setGenre] = useState('')

  const result = useQuery(ALL_BOOKS, {
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join('\n')
      setError(messages)
    },
    variables: { genre },
  })

  const books = useQuery(ALL_BOOKS)

  if (result.loading || books.loading) {
    return <div>loading...</div>
  }

  const genreList = [
    ...new Set(books.data.allBooks.flatMap((book) => book.genres)),
  ]

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
          {result.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>filter by genre</h3>
      <select value={genre} onChange={({ target }) => setGenre(target.value)}>
        <option key={'none'}>none</option>
        {genreList.map((a) => (
          <option key={a}>{a}</option>
        ))}
      </select>
    </div>
  )
}

export default Books

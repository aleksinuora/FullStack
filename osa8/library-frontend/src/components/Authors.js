import { useQuery, useMutation } from '@apollo/client'
import { useState } from 'react'

import { ALL_AUTHORS, ADD_BIRTH } from '../queries'

const Authors = ({ setError }) => {
  const [name, setName] = useState('')
  const [bornString, setBorn] = useState('')

  const result = useQuery(ALL_AUTHORS)
  const [addBirth] = useMutation(ADD_BIRTH, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    },
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()

    let setBornTo = Number(bornString)
    addBirth({ variables: { name, setBornTo } })
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {localStorage.getItem('library-user-token') ? (
        <form onSubmit={submit}>
          <h2>Set birthyear</h2>
          <div>
            author
            <select
              value={name}
              onChange={({ target }) => setName(target.value)}
            >
              {authors.map((a) => (
                <option key={a.name}>{a.name}</option>
              ))}
            </select>
          </div>
          <div>
            born
            <input
              type='number'
              value={bornString}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type='submit'>update author</button>
        </form>
      ) : null}
    </div>
  )
}

export default Authors

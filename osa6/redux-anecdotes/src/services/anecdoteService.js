import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  //debug logging
  console.log('running getAll...')
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async text => {
  //
  console.log('running createNew...')
  const object = { content: text, votes: 0 }
  //
  console.log(object)
  const response = await axios.post(baseUrl, object)
  return response.data
}

const voteAnecdote = async anecdote => {
  const newUrl = baseUrl+`/${anecdote.id}`
  const updatedAnecdote = {
    content: anecdote.content,
    votes: anecdote.votes+1,
    id: anecdote.id
  }
  const response = await axios.put(newUrl, updatedAnecdote)
  return response.data
}

export default { getAll,
  createNew,
  voteAnecdote
}
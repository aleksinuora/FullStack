import { useDispatch, useSelector } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const filterWord = useSelector(state => state.filtering.content)
  const anecdotes = useSelector(state => state.anecdotes.filter(an => an.content.toLowerCase().includes(filterWord)))

  const vote = (anecdote) => {
    dispatch(voteForAnecdote(anecdote))
    dispatch(setNotification(`Voted for "${anecdote.content}"`, 5000))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'


const orderByVotes = (state) => {
  const sortedState = state.sort((a, b) => b.votes - a.votes)
  return sortedState
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    incrementVote(state, action){
      const id = action.payload.id
      const voteTarget = action.payload
      return orderByVotes(state.map(an => an.id !== id ? an : voteTarget))
    },
    setAnecdotes(state, action){
      //
      console.log('running setAnecdotes...')
      return action.payload
    },
    appendAnecdote(state, action){
      state.push(action.payload)
    }
  }
})

export const { incrementVote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  //debug logging
  console.log('running initializeAnecdotes...')

  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(orderByVotes(anecdotes)))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteForAnecdote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.voteAnecdote(anecdote)
    dispatch(incrementVote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
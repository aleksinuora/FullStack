import { createSlice } from "@reduxjs/toolkit"

const message = 'NOTIFICATION: This is a message'
const initialState = {
  content: message,
  visibility: 'hidden'
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      return {
        content: action.payload,
        visibility: 'visible'
      }
    },
    hideNotification(state, action) {
      return initialState
    },
  }
})

let timerID

export const setNotification = (message, time) => {  
  return dispatch => {
    if (timerID) {
      clearTimeout(timerID)
    }
    const action = showNotification(message)
    dispatch(action)
    timerID = setTimeout(() => {
      dispatch(hideNotification())
    }, time)
  }
}

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer
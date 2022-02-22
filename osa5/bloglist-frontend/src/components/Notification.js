import React from 'react'

const Notification = ({ message, success }) => {
  if (message === null) {
    return null
  }

  const textColor = success ? 'green'
    : 'red'

  const notificationStyle = {
    color: textColor,
    backgroundColor: 'yellow',
    fontSize: 20,
    border: '5px solid',
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

//const notification = { Notification }
export default Notification
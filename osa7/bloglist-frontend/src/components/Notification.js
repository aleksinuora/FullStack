import React, { useContext } from 'react'
import MessageContext from '../MessageContext'

const Notification = (type) => {
  const [message] = useContext(MessageContext)
  if (message === null) {
    return null
  }

  const textColor = type.success ? 'green' : 'red'

  const notificationStyle = {
    color: textColor,
    backgroundColor: 'yellow',
    fontSize: 20,
    border: '5px solid',
    padding: 10,
    marginBottom: 10,
  }

  return <div style={notificationStyle}>{message}</div>
}

//const notification = { Notification }
export default Notification

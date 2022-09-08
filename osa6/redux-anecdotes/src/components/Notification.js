import { connect } from "react-redux"

const Notification = (props) => {
  const notification = props
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    visibility: notification.visibility
  }
  return (
    <div style={style}>
      {notification.content}
    </div>
  )
}

const mapStateToProps = (state) => {
  return state.notification
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
import React from "react"
import { connect } from "react-redux"

const Notification = (props) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 3,
    backgroundColor: "lightblue",
    textAlign: "center",
    fontSize: 20,
  }
  return <div style={style}>{props.notifications}</div>
}
const mapStateToProps = (state) => {
  return { notifications: state.notifications }
}

const ConnectedNotifications = connect(mapStateToProps)(Notification)
export default ConnectedNotifications

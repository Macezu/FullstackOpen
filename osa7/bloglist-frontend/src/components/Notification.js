import React from "react"
import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  return notification ? <div className={notification.class}>{notification.msg}</div> : null
}

export default Notification

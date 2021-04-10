import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notifications)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 3,
    backgroundColor: "lightblue",
    textAlign: "center",
    fontSize : 20
    
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
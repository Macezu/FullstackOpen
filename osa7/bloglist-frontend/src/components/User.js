import React from "react"
import { Link } from "react-router-dom"

const User = ({ user }) => {
  const userStyle = {
    display: "flex",
    "flexDirection": "row",
  }

  return (
    <div style={userStyle}>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
      <p style={{ marginLeft: 20, marginTop : 1 }}>{user.blogs.length}</p>
    </div>
  )
}
export default User

import React from "react"

const User = ({ user }) => {

  const userStyle = {
    margin: 10,
    marginBottom: 2
  }

  return (
    <div>
      <p style={userStyle}>
        {user.name} {user.blogs.length}
      </p>
    </div>
  )
}
export default User

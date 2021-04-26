import React from "react"
import { Link, useParams } from "react-router-dom"
import { useSelector } from "react-redux"


export const userListed = (user) => {
  return (
    <User key={user.id} user={user} />
  )
}

export const UserDetailed = () => {
  const allUsers = useSelector((state) => state.users)

  const id = useParams().id
  const user = allUsers.find(n => n.id === id)
  if (!allUsers === null) {    return null  }
  return (
    <div>
      <h2>{user.name}</h2>
      <p>added blogs :{user.blogs.length}</p>
      {user.blogs.map((blog) => (
        <li key={blog.id}>{blog.title}</li>
      ))}
    </div>
  )
}


const User = ({ user }) => {
  const userStyle = {
    display: "flex",
    "flexDirection": "row",
  }

  console.log(user)
  return (
    <div style={userStyle}>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
      <p style={{ marginLeft: 20, marginTop : 1 }}>{user.blogs.length}</p>
    </div>
  )
}




export default User

import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import { ALL_AUTHORS, EDIT_BIRTH } from "./queries"
import Select from "react-select"

const Authors = ({ show, authors }) => {
  const [aname, setName] = useState("")
  const [setBornTo, setBorn] = useState("")
  const [editBirth] = useMutation(EDIT_BIRTH)
  const options = authors.map((author) => {
    let option = { value: author.name, label: author.name }
    return option
  })

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    let name = aname.value
    
    editBirth(
      { variables: { name, setBornTo } },
      {
        refetchQueries: [{ query: ALL_AUTHORS }],
        onError: (error) => {
          alert(error.message)
        }
      }
    )
    setName("")
    setBorn("")
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set Birthyear</h3>
      <form onSubmit={submit}>
        <Select defaultValue={aname} onChange={setName} options={options} />
        <br />
        born{" "}
        <input
          type="number"
          value={setBornTo}
          onChange={({ target }) => setBorn(Number(target.value))}
        />
        <br />
        <button type="submit">update birthyear</button>
      </form>
    </div>
  )
}

export default Authors

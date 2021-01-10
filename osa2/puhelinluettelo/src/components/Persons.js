import React from 'react'
import axios from 'axios'

const ListItem = ({ person, reset }) => {
  for (let key in person) {
    if (person.hasOwnProperty(key)) {
      return (<li>{key} {person[key]} <button onClick={() => deletePerson(person,reset)}>delete</button></li>)
    }
  }
}


const deletePerson = (person,reset) =>{
  console.log(person.id)
  axios.delete(`http://localhost:3001/persons/${person.id}`).catch(error => console.log('error'))
  reset()
  
}

const Persons = ({ persons,filter, reset }) => {

  let listItems = []
  const final = []

  if (filter !== '') {
    const keys = persons.map(person => Object.keys(person)).flat()
    const matches = keys.filter(key => key.toUpperCase().includes(filter.toUpperCase()))

    for (let obj of persons) {
      for (let match of matches) {
        if (obj.hasOwnProperty(match))
          final.push(obj)
      }
    }
    listItems = final.map((person,i) => <ListItem key={i} person={person} reset={reset} />)
  } else {
    listItems = persons.map((person,i) => <ListItem key={i} person={person} reset={reset} />)
  }


  return (
    <ul>
      {listItems}
    </ul>
  )

}

export default Persons
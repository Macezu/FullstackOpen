import React from 'react'
import axios from 'axios'


const baseUrl = '/api/persons'


const ListItem = ({ key,person }) => {
  for (let val in person) {
    if (person.hasOwnProperty(val)) {
      return (<li>{val} {person[val]}</li>)
    }
  }
}



const deletePerson = (id,reset) => {
  axios.delete(`${baseUrl}/${id}`).catch(error => console.log('error'))
  reset()

}

const Persons = ({ persons,filter,reset }) => {
  let ids = persons.map(person => <li><button onClick={() => deletePerson(person.id,reset)}>delete</button></li>)
  persons = persons.map(person => person.obj)




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
    listItems = final.map((person,i) => <ListItem key={i} person={person} />)
  } else {
    listItems = persons.map((person,i) => <ListItem key={i} person={person} />)
  }




  return (
    <ul>
      {listItems}{ids}
    </ul>
  )

}

export default Persons
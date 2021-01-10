import React,{ useEffect,useState } from 'react'
import Persons from './components/Persons'
import PersonRecords from './components/PersonRecords'
import Filter from './components/Filter'
import Numberbase from './components/Numbers'

const App = () => {
  const [persons,setPersons] = useState([])

  const [newName,setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [filter,setFilter] = useState('')
  const [successMessage,setSuccesfull] = useState(null)
  const [errorMessage,setErrorMessage] = useState(null)


  const handleNameChange = (event) => (setNewName(event.target.value))
  const handleNumberChange = (event) => (setNewNumber(event.target.value))
  const handleFilterChange = (event) => (setFilter(event.target.value))

  useEffect(() => {
    Numberbase
      .getAllNumbers()
      .then(initialNums => {
        setPersons(initialNums)
      })
  },[successMessage,errorMessage])

  const reset = (error) => {
    setNewName('')
    setNewNumber('')
    if (error === undefined) {
      setSuccesfull(`Successfull operation`)
      setTimeout(() => {
        setSuccesfull(null)
      },3000)
    } if (error === true) {
      console.log('true')
      setErrorMessage("Server wasn't up to date")
      setTimeout(() => {
        setErrorMessage(null)
      },3000)
    }

  }


  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className="success">
        {message}
      </div>
    )
  

  }

  const Error = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className="failure">
        {message}
      </div>
    )
  

  }

  const addPerson = (event) => {
    event.preventDefault()

    let id = ""
    const personObject = {
      [newName]: newNumber
    }

    let found = false

    for (let person of persons) {
      if (person.hasOwnProperty(newName)) {
        id = person.id
        found = true
      }
    }

    if (found) {

      Numberbase
        .updateNumber(id,personObject)
        .then(returnedperson => {
          if (returnedperson === true) {
            reset(returnedperson)
          } else {
            window.alert(`${newName} is already added to phonebook, number is going to be updated`)
            setPersons(persons.map(person => person.id !== id ? person : returnedperson))
          }


        })


    } else {

      Numberbase
        .create(personObject)
        .then(returnedbase => {
          setPersons(persons.concat(returnedbase))
        })
      reset()
    }

  }



  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      <Error message={errorMessage} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new person</h3>
      <PersonRecords newName={newName} newNumber={newNumber} addPerson={addPerson}
        handleNumberChange={handleNumberChange} handleNameChange={handleNameChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} reset={() => reset()} />
    </>
  )

}


export default App
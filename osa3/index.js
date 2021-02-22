const { response } = require('express')
const express = require('express')
const app = express()

var fs = require('fs')
var morgan = require('morgan')
var path = require('path')
const cors = require('cors')

app.use(cors())

morgan.token('id', function getId (req) {
    return req.id
  })

app.use(morgan('tiny'))

app.use(express.json())

let persons = [{
    id : 1,
    name : "Arto Hellas",
    number : "040-123456"
},{
    id: 2,
    name : "Ada Lovelace",
    number : "39-44-5323523"
},{
    id: 3,
    name : "Johnny Sins",
    number : "39-04-4512845"
}, {
    id: 4,
    name : "Dan Abramov",
    number : "39-23-6423122"
}
]


app.get('/', (req, res) => res.send('Hello World!'))
app.get('/api/persons',(req,res) => {
        res.json(persons)
})

app.get('/info',(req,res) => {
    const count = persons.length
    const date = Date()

    res.send(`Phonebook has info for ${count} people. <br/><br/> ${date}`)
})

app.get('/api/persons/:id',(req,res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person){
        console.log(person)
        res.json(person)
    } else {
        res.status(404).end
    }
})

app.delete('/api/persons/:id',(request,response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons',(request,response) => {
    const body = request.body
    const names = persons.map(obj => obj.name)

    if (!body.name) {
        return response.status(400).json({
            error: 'no name given'
        })
    } else if(!body.number){
        return response.status(400).json({
            error: 'no number given'
        })
    } else if(names.includes(body.name)){
        return response.status(400).json({
            error: 'number already found in records'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number : body.number

    }

    persons = persons.concat(person)

    response.json(persons)
})

let generateId = ()=>{
    min = Math.ceil(5);
    max = Math.floor(1500);
  return Math.floor(Math.random() * (max - min) + min); 
}





const PORT = process.env.PORT || 3001app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
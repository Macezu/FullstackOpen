/* eslint-disable linebreak-style */
const express = require('express')
require('dotenv').config()
const app = express()
const Phonebook = require('./models/person')
var morgan = require('morgan')
const cors = require('cors')

app.use(cors())

morgan.token('id',function getId(req) {
    return req.id
})

app.use(morgan('tiny'))

app.use(express.json())
app.use(express.static('build'))



app.get('/',(req,res) => res.send('Hello World!'))

app.get('/api/persons',(req,res) => {
    Phonebook.find({}).then(person => {
        res.json(person)
    })
})

app.get('/info',(req,res) => {
    Phonebook.count({},function (err,count) {
        const date = Date()
        console.log('there are %d jungle adventures',count)
        res.send(`Phonebook has info for ${count} people. <br/><br/> ${date}`)
    })

})

app.get('/api/persons/:id',(req,res,next) => {
    Phonebook.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person)
            } else { res.status(404).end() }
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id',(req,res,next) => {
    const body = req.body
    console.log(body)
    const person = {
        obj: body
    }

    Phonebook.findByIdAndUpdate(req.params.id,person,{ new: true })
        .then(updatePrson => {
            console.log(updatePrson)
            res.json(updatePrson)
        }).catch(error => next(error))



})

app.delete('/api/persons/:id',(req,res,next) => {

    Phonebook.findByIdAndRemove(req.params.id).then(response => {
        if (response) {
            console.log(`Successfully deleted document that had the form: ${response}.`)
        } else {
            console.log('No document matches the provided query.')
        }
        res.status(204).end()
    })
        .catch((error) => next(error))
})

app.post('/api/persons',(req,res,next) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({ error: 'content missing' })
    }


    let newp = { [Object.keys(body)]: Object.values(body)[0] }
    const person = new Phonebook()
    person.obj = newp


    person.save().then(savedPerson => {
        res.json(savedPerson)
    }).catch((error) => {
        next(error)
    })


})

const unknownEndpoint = (request,response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// olemattomien osoitteiden käsittely
app.use(unknownEndpoint)

const errorHandler = (error,request,response,next) => {

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        console.error(error.message)
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)



// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
})
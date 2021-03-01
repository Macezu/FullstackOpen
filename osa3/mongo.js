/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
let prson
if (process.argv[3] && process.argv[4] !== undefined) {
    prson = { [process.argv[3]] : process.argv[4] }
    console.log(prson)
}

const url =
    `mongodb+srv://Macezu:${password}@cluster0.ds3gw.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false,useCreateIndex: true })

const numberSchema = new mongoose.Schema({
    content: Object
})

const Person = mongoose.model('Person', numberSchema)

const person = new Person({
    content : prson
})

if (prson){
    person.save().then(response => {
        console.log('person saved!')
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.content)
        })
        mongoose.connection.close()
    })
}

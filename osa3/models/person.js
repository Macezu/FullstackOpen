/* eslint-disable linebreak-style */
const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

// eslint-disable-next-line no-undef
url = process.env.MongoDB_URL

// eslint-disable-next-line no-undef
mongoose.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false,useCreateIndex: true })
    .then(() => {
        console.log('Connected to DB')
    }).catch(() => {
        console.log('Error Connecting to DB')
    })

const personSchema = new mongoose.Schema({
    obj: {
        type: Object,
        unique : true,
        validate: {
            validator: (v) => {
                return  (Object.keys(v)[0].length >= 3 && Object.values(v)[0].length >= 8)
            },
            message: () => 'Name or phone number not valid!'
        },
        required: [true, 'User phone number required']
    }

})

personSchema.plugin(uniqueValidator)




personSchema.set('toJSON',{
    transform: (document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('Person',personSchema)
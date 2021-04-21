require('dotenv').config()

let PORT = process.env.PORT
let mongoUrl = process.env.NODE_ENV === 'test' ?
    process.env.TEST_MONGODB_URL
    : process.env.MONGODB_URL

module.exports = {
    PORT,
    mongoUrl
}
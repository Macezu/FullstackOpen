require('dotenv').config()

let PORT = process.env.PORT
let mongoUrl = process.env.MongoDB_URL

module.exports = {
    PORT,
    mongoUrl
}
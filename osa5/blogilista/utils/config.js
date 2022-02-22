require('dotenv').config()

let PORT = process.env.PORT
let DB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_DB_URI
    : process.env.DB_URI
let DBUG = process.env.DBUG

module.exports = {
    DB_URI,
    PORT,
    DBUG
}
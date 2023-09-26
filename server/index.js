// THESE ARE NODE APIs WE WISH TO USE
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

// CREATE OUR SERVER
dotenv.config()
const PORT = process.env.PORT || 4000;
const app = express()

// SETUP THE MIDDLEWARE
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))
app.use(express.json({limit: '50mb'}))
app.use(cookieParser())


// INITIALIZE OUR DATABASE OBJECT
// const db = require('./db/database')
// db.on('error', console.error.bind(console, 'MongoDB connection error:'))


// app.use(express.static('client/build'));
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/client/build/index.html'));
// });

const path = require("path");

app.use(express.static(path.resolve(__dirname, "./client/build")));

// app.get("*", function (request, response) {
//   response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
// });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
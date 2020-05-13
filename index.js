// Require the node modules needed
let cors = require('cors')
let express = require('express')

// Create an app instance
let app = express()

// Set up middleware needed
app.use(express.urlencoded({extended:false})) //to accept form data
app.use(express.json()) //accepts data from AJAX requests (e.g., fetch, axios, etc)
app.use(cors()) //allow access to the routes in this app
// TODO: body-parser, cors

// Include any controllers we have
app.use('/v1/bounties', require('./controllers/v1/bounties'))

// Define a catch-all route (AKA 404)
app.get('*', (req, res) => {
    res.status(404).send({ message: 'Not Found' })
})

// Listen on the specified PORT
app.listen(process.env.PORT || 3000)

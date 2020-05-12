require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


app.use(express.static('dist'))



// designates what port the app will listen to for incoming requests
app.listen(process.env.PORT, function () {
    console.log(`Travel app listening on port ${process.env.PORT}!`)
})
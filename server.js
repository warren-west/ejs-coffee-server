require('dotenv').config()
const port = process.env.PORT || 3000

const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

// Static resources
app.use(express.static('public'))
app.use(express.static('node_modules/jquery/dist'))

const apiHelper = require('./utils/api')

const coffeeRouter = require('./routes/coffeeRouter')

app.use(getCoffeeMiddleware)
app.use('/coffees', coffeeRouter)

async function getCoffeeMiddleware(req, res, next) {
    console.log("getCoffeeMiddleware fired!")

    // If coffee data is empty, fetch it
    if (apiHelper.coffees.length === 0) {
        await apiHelper.getCoffeeData()
        console.log(apiHelper.coffees)
    }

    next()
}


// Home page
app.get('/', (req, res) => {
    res.send() // empty
})


// Serve the app
app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`)
})
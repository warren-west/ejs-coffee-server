require('dotenv').config()
const port = process.env.PORT || 3000

const express = require('express')
var session = require('express-session')
var passport = require('passport')

const app = express()

app.use(session({
    secret: 'Secret',
    resave: false,
    saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use(express.urlencoded({ extended: false }))

// Static resources
app.use(express.static('public'))
app.use(express.static('node_modules/jquery/dist'))

const apiHelper = require('./utils/api')

// stuff for / (index)
const indexRouter = require('./routes/index')
app.use('/', indexRouter)

// stuff for /auth
const authRouter = require('./routes/auth')
app.use('/login', authRouter)

// stuff for /coffee
const coffeeRouter = require('./routes/coffeeRouter')
app.use(getCoffeeMiddleware)
app.use('/coffees', coffeeRouter)

async function getCoffeeMiddleware(req, res, next) {
    // console.log("getCoffeeMiddleware fired!")

    // If coffee data is empty, fetch it
    if (apiHelper.coffees.length === 0) {
        await apiHelper.getCoffeeData()
        console.log(apiHelper.coffees)
    }

    next()
}

// Serve the app
app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`)
})
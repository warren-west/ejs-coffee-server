const express = require('express')
const apiHelper = require('../utils/api')
const router = express.Router()
const fs = require('fs')

router.route('/')
    // GET /coffees
    .get((req, res) => {

        // console.log(`URL: ${req.url}`)
        // console.log(`Query Param 'search': ${req.query.search}`)

        const coffeesToRender = []

        if (!req.query.search) {
            coffeesToRender.push(...apiHelper.coffees)
        } else {
            // We're making the search logic case INSENSITIVE
            // exact match logic:
            // coffeesToRender.push(...apiHelper.coffees.filter((item) => item.description.toLowerCase() === req.query.search.trim().toLowerCase()))
            // partial match logic:
            coffeesToRender.push(...apiHelper.coffees.filter((item) => item.description.toLowerCase().includes(req.query.search.trim().toLowerCase())))
        }

        // console.log(coffeesToRender)

        const currentUser = req.user

        if (currentUser) {
            const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'))
            const existingUser = users.find(u => u.username === currentUser)
    
            // console.log(existingUser.username)
            // console.log(existingUser.viewedCoffees.length)
    
            const viewedCoffees = existingUser.viewedCoffees ? existingUser.viewedCoffees : []

            res.render('coffees', { coffees: coffeesToRender, currentUser, viewedCoffees })
        }

        res.render('coffees', { coffees: coffeesToRender, currentUser, viewedCoffees: [] })

    })
    // POST /coffees
    .post((req, res) => {

    })

// GET /coffees/5
router.get('/:id', (req, res, next) => req.isAuthenticated() ? next() : res.redirect('/login'), (req, res) => {
    // req.params.id
    const currentUser = req.user
    const theCoffee = apiHelper.coffees.find((coffee) => coffee.id === Number(req.params.id))

    // If the user has not viewed this coffee yet, add it to the user's history

    // console.log(currentUser)

    // Import users from json file ✅
    // find current user object ✅
    // check if current user has viewHistory ✅
        // if no, set current coffee id to viewHistory ✅
        // if yes, check if current coffee id exists in viewHistory*
            // if yes, do nothing
            // if no, add it to the viewHistory* &&
    // save the updated users object to json file with fs ✅

    const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'))
    const existingUser = users.find(u => u.username === req.user)

    if (!existingUser.viewedCoffees)
        existingUser.viewedCoffees = [Number(req.params.id)]
    else if (!existingUser.viewedCoffees.includes(Number(req.params.id)))
        existingUser.viewedCoffees.push(Number(req.params.id))

    fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 2))

    // console.log(`theCoffee is ${theCoffee.description} ${theCoffee.price}`)
    res.render('coffeeDetails', { theCoffee, currentUser })
})
/* Middleware for checking if a user is logged in, if they aren't send them to the login page before accessing the guarded page
function middlewareIsAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    }
    res.redirect('/login')
}

const middlewareIsAuthenticatedShort = (req, res, next) => req.isAuthenticated() ? next() : res.redirect('/login')
*/
module.exports = router
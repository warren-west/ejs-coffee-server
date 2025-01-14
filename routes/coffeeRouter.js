const express = require('express')
const apiHelper = require('../utils/api')
const router = express.Router()


router.route('/')
    // GET /coffees
    .get((req, res) => {
        res.render('coffees', { coffees: apiHelper.coffees })
    })
    // POST /coffees
    .post((req, res) => {

    })

// GET /coffees/5
router.get('/:id', (req, res) => {
    // req.params.id
})

module.exports = router
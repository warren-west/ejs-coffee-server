const router = require('express').Router()

router.get('/', (req, res) => {
    const currentUser = req.user
    res.render('index', { currentUser })
})

module.exports = router
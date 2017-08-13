let express = require('express')
let router = express.Router()
let lastfm = require('../bin/lastfm')

router.get('/', function (req, res, next) {
  lastfm
    .getUserInfo(`mcmadbat3`)
    .then(data => {
      res.render(`index`, {user: data})
    })
    .catch(err => {
      next(err)
    })
})

module.exports = router

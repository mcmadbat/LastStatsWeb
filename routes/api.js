let express = require('express')
let router = express.Router()
let lastfm = require('../bin/lastfm')
let analysis = require('../analysis/analysis')

router.get('/user/getinfo', function (req, res, next) {
  let username = req.query.user

  lastfm
    .getUserInfo(username)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(err => {
      res.status(500).send(err)
    })
})

router.get('/user/getscrobbles', function (req, res, next) {
  let username = req.query.user

  lastfm
    .getScrobbles(username)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send(err)
    })
})

router.get('/user/topartists', function (req, res, next) {
  let username = req.query.user
  let range = req.query.range
  let limit = req.query.limit

  if (!limit) {
    limit = 10
  }

  lastfm
    .getScrobbles(username)
    .then(scrobbles => {
      return analysis.topartists(scrobbles, range, limit)
    })
    .then(data => {
      res.status(200).send(data)
    })
    .catch(err => {
      console.error(err)
      if (!res.headerSent) {
        res.status(500).send(err)
      }
    })
})

router.get('/user/scrobblecount', function (req, res, next) {
  let username = req.query.user
  let range = req.query.range

  if (!range) {
    range = 'year'
  }

  lastfm
    .getScrobbles(username)
    .then(scrobbles => {
      return analysis.scrobbleCount(scrobbles, range)
    })
    .then(data => {
      res.status(200).send(data)
    })
    .catch(err => {
      console.error(err)
      if (!res.headerSent) {
        res.status(500).send(err)
      }
    })
})

module.exports = router

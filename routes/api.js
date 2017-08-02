let express = require('express');
let router = express.Router();
let request = require('request-promise');
let lastfm = require('../bin/lastfm');
let db = require('../db/mongo')

router.get('/user/getinfo', function(req, res, next) {
	let username = req.query.user;

	lastfm
		.getUserInfo(username)
		.then(data => {
			res.status(200).send(data);
		})
		.catch(err => {
			res.status(500).send(err);
		});
});

router.get('/user/getscrobbles', function(req, res, next) {
	let username = req.query.user;

	lastfm
		.getScrobbles(username)
		.then(data => {
			res.status(200).send(data);
		})
		.catch(err => {
			res.status(500).send(err);
		});
});

router.get('/user/getscrobbles/test', function(req, res, next) {
	let username = req.query.user;
	db.init().then(data => {
		return db.insert(username);
	}).then (data => {
		res.status(200).send(data);
	}).catch (err => {
		console.log(err)
		res.status(500).send(err);
	});
});

module.exports = router;

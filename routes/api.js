let express = require('express');
let router = express.Router();
let request = require('request-promise');
let lastfm = require('../bin/lastfm');

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

module.exports = router;

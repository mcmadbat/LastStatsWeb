let request = require('request-promise');

const KEY = process.env.LAST_FM_KEY;
const URL_ROOT = `http://ws.audioscrobbler.com/2.0/`;
 
let lastfm = {};

let User = require('../routes/models/User');
let Scrobble = require('../routes/models/Scrobble');

// performs a http GET operation on the url and return the response in a promise
let get = (url) => {
	let options = {
		uri : url,
		json: true
	};

	return request(options);
};

// gets basic user information
lastfm.getUserInfo = (user) => {
	if (!user){
		return Promise.reject(`Param user is null!`);
	} 

	let url = `${URL_ROOT}?method=user.getinfo&user=${user}&api_key=${KEY}&format=json`;

	return get(url)
		.then(data => {
			if (data.error) {
				return Promise.reject(data);
			}

			let user = new User(
				data.user.name,
				data.user.realName,
				data.user.url,
				data.user.country,
				data.user.playcount,
				data.user.registered.unixtime
			);

			return Promise.resolve(user);
		})
		.catch(err => {
			if (err.message){
				return Promise.reject(err.message);
			}
			return Promise.reject(err);
		});
};

// gets all scrobbles for a user
lastfm.getScrobbles = (user) => {
	if (!user){
		return Promise.reject(`Param user is null!`);
	} 

	let url = `${URL_ROOT}?method=user.getrecenttracks&user=${user}&api_key=${KEY}&format=json`;

	return get(url)
		.then(data => {
			let scrobbles = data.recenttracks.track.map(item => {
				return new Scrobble(item.name, item.album['#text'], item.artist['#text'], item.date.uts);
			});

			return Promise.resolve(scrobbles);
		})
		.catch(err => {
			if (err.message){
				return Promise.reject(err.message);
			}
			return Promise.reject(err);
		});
};


module.exports = lastfm;

			
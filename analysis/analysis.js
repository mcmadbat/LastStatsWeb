let analysis = {};

let getTimeBracket = date => {
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDay();

	return {year, month, day};
}

// top artists
analysis.topartists = (scrobbles, range, limit) => {
	let result = {};

	scrobbles.forEach(scrobble => {
		let date = new Date(scrobble.time * 1000);

		let bracket = getTimeBracket(date);

		// first make sure the key exists
		if (!result[bracket.year]){
			result[bracket.year] = {};
		}

		if (range === 'year') {
			if(result[bracket.year][scrobble.artist]){
				result[bracket.year][scrobble.artist]++;
			} else {
				result[bracket.year][scrobble.artist] = 1;
			}
		} else if (range === 'month') {
			if (!result[bracket.year][bracket.month]){
				result[bracket.year][bracket.month] = {};
			}

			if(result[bracket.year][bracket.month][scrobble.artist]){
				result[bracket.year][bracket.month][scrobble.artist]++;
			} else {
				result[bracket.year][bracket.month][scrobble.artist] = 1;
			}
		}
	});


	return Promise.resolve(result);
}


// scrobbles count
analysis.scrobbleCount = (scrobbles, range) => {
	let result = {};

	scrobbles.forEach(scrobble => {
		let date = new Date(scrobble.time * 1000);

		let bracket = getTimeBracket(date);

		if (range === 'year') {
			if(result[bracket.year]){
				result[bracket.year]++;
			} else {
				result[bracket.year] = 1;
			}
		} else if (range === 'month') {
			if (!result[bracket.year]) {
				result[bracket.year] = {};
			}

			if(result[bracket.year][bracket.month]){
				result[bracket.year][bracket.month]++;
			} else {
				result[bracket.year][bracket.month] = 1;
			}
		}
	});


	return Promise.resolve(result);
}


module.exports = analysis;
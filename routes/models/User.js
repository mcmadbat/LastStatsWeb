class User {
	constructor(name, realName, url, country, playcount, registeredTime) {
		this.name = name;
		this.realName = realName;
		this.url = url;
		this.country = country;
		this.playcount = playcount;
		this.registeredTime = registeredTime;
	}
}

module.exports = User;
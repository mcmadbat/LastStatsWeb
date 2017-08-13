class User {
	constructor(name, realName, url, imgUrl, country, playcount, registeredTime) {
		this.name = name;
		this.realName = realName;
		this.url = url;
		this.imgUrl = imgUrl;
		this.country = country;
		this.playcount = playcount;
		this.registeredTime = registeredTime;
	}
}

module.exports = User;
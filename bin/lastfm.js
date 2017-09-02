let request = require('request-promise')
let ProgressBar = require('ascii-progress')
let db = require('../db/mongo')

const KEY = process.env.LAST_FM_KEY
const URL_ROOT = `http://ws.audioscrobbler.com/2.0/`

let lastfm = {}

let User = require('../routes/models/User')
let Scrobble = require('../routes/models/Scrobble')

const SECONDS_IN_DAY = 86400
const DATA_REFRESH_INTERVAL = SECONDS_IN_DAY

// performs a http GET operation on the url and return the response in a promise
let get = url => {
  let options = {
    uri: url,
    json: true
  }

  return request(options)
}

let getAllScrobbles = (url, pages) => {
  let promises = []

  console.log(`Trying to retrieve ${pages} pages of data...`)

  // helpful
  let bar = new ProgressBar({
    schema: ':current/:total',
    total: pages
  })

  for (var x = 1; x <= pages; x++) {
    let y = x
    let promise = get(`${url}&page=${y}`)
      .then(data => {
        bar.tick()
        if (data.error) {
          return Promise.reject(data)
        }

        let scrobbles = data.recenttracks.track.map(item => {
          return new Scrobble(item.name, item.album['#text'], item.artist['#text'], item.date.uts)
        })

        return Promise.resolve(scrobbles)
      })
      .catch(err => {
        bar.tick()
        if (err.message) {
          return Promise.reject(err.message)
        }
        return Promise.reject(err)
      })

    promises.push(promise)
  }

  return Promise.all(promises).then(pages => {
    // merge
    let sortedArr = pages.sort((a, b) => {
      let dateA = a.time
      let dateB = b.time

      if (dateA < dateB) {
        return -1
      } else if (dateB < dateA) {
        return 1
      }

      return 0
    })

    let mergedArr = []
    sortedArr.forEach(arr => {
      mergedArr = mergedArr.concat(arr)
    })

    return Promise.resolve(mergedArr)
  })
}

// gets basic user information
lastfm.getUserInfo = user => {
  if (!user) {
    return Promise.reject(new Error(`Param user is null!`))
  }

  let url = `${URL_ROOT}?method=user.getinfo&user=${user}&api_key=${KEY}&format=json`

  return get(url)
    .then(data => {
      if (data.error) {
        return Promise.reject(data)
      }

      let user = new User(
        data.user.name,
        data.user.realName,
        data.user.url,
        data.user.image[3]['#text'],
        data.user.country,
        data.user.playcount,
        data.user.registered.unixtime
      )

      return Promise.resolve(user)
    })
    .catch(err => {
      if (err.message) {
        return Promise.reject(err.message)
      }
      return Promise.reject(err)
    })
}

// gets all scrobbles for a user
lastfm.getScrobbles = user => {
  if (!user) {
    return Promise.reject(new Error(`Param user is null!`))
  }

  let fromDb = false
  let url = `${URL_ROOT}?method=user.getrecenttracks&user=${user}&api_key=${KEY}&format=json&limit=200`

  // check if db has a copy first
  return db.init()
    .then(() => {
      return db.get(user)
    })
    .then(data => {
      if (data) {
        // check data freshness
        let timeDiff = new Date().getTime() - data.updated
        timeDiff = timeDiff / 1000

        if (timeDiff < DATA_REFRESH_INTERVAL) {
          fromDb = true
          return Promise.resolve(data)
        }
      }

      return get(url)
    })
    .then(data => {
      if (data.error) {
        return Promise.reject(data)
      }

      if (fromDb) {
        return Promise.resolve(data.data)
      }

      return getAllScrobbles(url, data.recenttracks['@attr'].totalPages)
    })
    .then(scrobbles => {
      if (!fromDb) {
        // insert into db as well
        return db.upsert(user, scrobbles)
          .then(() => {
            console.log(`scrobble data for ${user} inserted into db`)
            return Promise.resolve(scrobbles)
          })
      }

      return Promise.resolve(scrobbles)
    })
    .catch(err => {
      if (err.message) {
        return Promise.reject(err.message)
      }
      return Promise.reject(err)
    })
}

// essentially a wrapper for the artistinfo api call
lastfm.getArtistInfo = artistName => {
  if (!artistName) {
    return Promise.reject(new Error(`artistName is not set!`))
  }

  let url = `${URL_ROOT}?method=artist.getinfo&artist=${artistName}&api_key=${KEY}&format=json`

  return get(url)
          .then(data => {
            if (data.error) {
              return Promise.reject(data)
            }

            return Promise.resolve(data)
          })
}

// essentially a wrapper for the albuminfo api call
lastfm.getAlbumInfo = (artistName, albumName) => {
  if (!artistName) {
    return Promise.reject(new Error(`artistName is not set!`))
  }

  if (!albumName) {
    return Promise.reject(new Error(`albumName is not set!`))
  }

  let url = `${URL_ROOT}?method=album.getinfo&artist=${artistName}&album=${albumName}&api_key=${KEY}&format=json`

  return get(url)
          .then(data => {
            if (data.error) {
              return Promise.reject(data)
            }

            return Promise.resolve(data)
          })
}

module.exports = lastfm

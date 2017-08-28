let analysis = {}

const _MONTHS = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec' ]

let getTimeBracket = date => {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDay()

  return {year, month, day}
}

// top artists
analysis.topArtists = (scrobbles, range, limit) => {
  let result = {}

  scrobbles.forEach(scrobble => {
    if (!range) {
      // all-time
      if (result[scrobble.artist]) {
        result[scrobble.artist]++
      } else {
        result[scrobble.artist] = 1
      }
    }

    let date = new Date(scrobble.time * 1000)

    let bracket = getTimeBracket(date)

    if (!result[bracket.year]) {
      result[bracket.year] = {}
    }

    if (range === 'year') {
      if (result[bracket.year][scrobble.artist]) {
        result[bracket.year][scrobble.artist]++
      } else {
        result[bracket.year][scrobble.artist] = 1
      }
    } else if (range === 'month') {
      if (!result[bracket.year][bracket.month]) {
        result[bracket.year][bracket.month] = {}
      }

      if (result[bracket.year][bracket.month][scrobble.artist]) {
        result[bracket.year][bracket.month][scrobble.artist]++
      } else {
        result[bracket.year][bracket.month][scrobble.artist] = 1
      }
    }
  })

  // now only return the top
  if (!range) {
    let arr = Object.keys(result)
      .map(x => {
        return {
          artist: x,
          plays: result[x]
        }
      })
      .sort((a, b) => {
        if (a.plays >= b.plays) {
          return -1
        } else {
          return 1
        }
      })
      .slice(0, limit)

    result = {}
    arr.forEach(x => {
      result[x.artist] = x.plays
    })
  }

  return Promise.resolve(result)
}

// top albums
analysis.topAlbums = (scrobbles, range, limit) => {
  let result = {}

  scrobbles.forEach(scrobble => {
    if (!range) {
      // all-time
      if (result[scrobble.album]) {
        result[scrobble.album]++
      } else {
        result[scrobble.album] = 1
      }
    }

    let date = new Date(scrobble.time * 1000)

    let bracket = getTimeBracket(date)

    if (!result[bracket.year]) {
      result[bracket.year] = {}
    }

    if (range === 'year') {
      if (result[bracket.year][scrobble.album]) {
        result[bracket.year][scrobble.album]++
      } else {
        result[bracket.year][scrobble.album] = 1
      }
    } else if (range === 'month') {
      if (!result[bracket.year][bracket.month]) {
        result[bracket.year][bracket.month] = {}
      }

      if (result[bracket.year][bracket.month][scrobble.album]) {
        result[bracket.year][bracket.month][scrobble.album]++
      } else {
        result[bracket.year][bracket.month][scrobble.album] = 1
      }
    }
  })

  // now only return the top
  if (!range) {
    let arr = Object.keys(result)
      .map(x => {
        return {
          album: x,
          plays: result[x]
        }
      })
      .sort((a, b) => {
        if (a.plays >= b.plays) {
          return -1
        } else {
          return 1
        }
      })
      .slice(0, limit)

    result = {}
    arr.forEach(x => {
      result[x.album] = x.plays
    })
  }

  return Promise.resolve(result)
}

// top tracks
analysis.topTracks = (scrobbles, range, limit) => {
  let result = {}

  scrobbles.forEach(scrobble => {
    if (!range) {
      // all-time
      if (result[scrobble.name]) {
        result[scrobble.name]++
      } else {
        result[scrobble.name] = 1
      }
    }

    let date = new Date(scrobble.time * 1000)

    let bracket = getTimeBracket(date)

    if (!result[bracket.year]) {
      result[bracket.year] = {}
    }

    if (range === 'year') {
      if (result[bracket.year][scrobble.name]) {
        result[bracket.year][scrobble.name]++
      } else {
        result[bracket.year][scrobble.name] = 1
      }
    } else if (range === 'month') {
      if (!result[bracket.year][bracket.month]) {
        result[bracket.year][bracket.month] = {}
      }

      if (result[bracket.year][bracket.month][scrobble.name]) {
        result[bracket.year][bracket.month][scrobble.name]++
      } else {
        result[bracket.year][bracket.month][scrobble.name] = 1
      }
    }
  })

  // now only return the top
  if (!range) {
    let arr = Object.keys(result)
      .map(x => {
        return {
          name: x,
          plays: result[x]
        }
      })
      .sort((a, b) => {
        if (a.plays >= b.plays) {
          return -1
        } else {
          return 1
        }
      })
      .slice(0, limit)

    result = {}
    arr.forEach(x => {
      result[x.name] = x.plays
    })
  }

  return Promise.resolve(result)
}

// scrobbles count
analysis.scrobbleCount = (scrobbles, range) => {
  let result = {}

  if (range === 'lastyear') {
    // build out the last 12 months
    let curDate = new Date()
    let timeLimit = new Date(`2012-01-01`)
    timeLimit.setYear(curDate.getFullYear() - 1)
    timeLimit.setMonth(curDate.getMonth() + 1, 1)
    timeLimit.setHours(0)

    // remove scrobbles that are out of the time range
    scrobbles = scrobbles.filter(scrobble => {
      return (scrobble.time * 1000) >= timeLimit.getTime()
    })

    for (let x = 0; x < 11; x++) {
      result[`${timeLimit.getFullYear()} ${_MONTHS[timeLimit.getMonth()]}`] = 0
      timeLimit.setMonth(timeLimit.getMonth() + 1)
    }
  }

  scrobbles.forEach(scrobble => {
    let date = new Date(scrobble.time * 1000)

    let bracket = getTimeBracket(date)

    if (range === 'year') {
      if (result[bracket.year]) {
        result[bracket.year]++
      } else {
        result[bracket.year] = 1
      }
    } else if (range === 'month') {
      if (!result[bracket.year]) {
        result[bracket.year] = {}
      }

      if (result[bracket.year][bracket.month]) {
        result[bracket.year][bracket.month]++
      } else {
        result[bracket.year][bracket.month] = 1
      }
    } else if (range === 'lastyear') {
      let key = `${bracket.year} ${_MONTHS[bracket.month - 1]}`
      if (!result[key]) {
        result[key] = 0
      }
      result[key]++
    }
  })

  delete result['1969']

  return Promise.resolve(result)
}

module.exports = analysis

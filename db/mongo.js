let mongo = require('mongodb').MongoClient

let conn = null
let db = {}
let url = 'mongodb://localhost:27017/lastfm'

db.init = () => {
  if (conn === null) {
    return mongo.connect(url).then(db => {
      conn = db
      return Promise.resolve(true)
    })
  } else {
    return Promise.resolve(true)
  }
}

db.dispose = () => {
  if (conn) {
    conn.close()
  }
}

db.get = (_id) => {
  if (!conn) {
    return Promise.reject(new Error(`db connection is not setup (try init()?)`))
  }

  return conn.collection(`scrobbles`).findOne({_id})
}

db.insert = (_id, data) => {
  if (!conn) {
    return Promise.reject(new Error(`db connection is not setup (try init()?)`))
  }

  let collection = conn.collection(`scrobbles`)

  let doc = {
    _id,
    data,
    updated: new Date().getTime()
  }

  // first check if the doc exists
  return collection.findOne({_id}).then(data => {
    if (data) {
      return Promise.reject(new Error(`${_id} is already a document!`))
    } else {
      return collection.insertOne(doc)
    }
  })
}

db.upsert = (_id, data) => {
  if (!conn) {
    return Promise.reject(new Error(`db connection is not setup (try init()?)`))
  }

  let collection = conn.collection(`scrobbles`)

  let doc = {
    _id,
    data,
    updated: new Date().getTime()
  }

  // first check if the doc exists
  return collection.replaceOne({_id}, doc, {upsert: true})
}

module.exports = db

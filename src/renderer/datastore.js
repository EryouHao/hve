import path from 'path'
import { remote } from 'electron'
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(path.join(remote.app.getPath('documents'), 'hve-blog/db/db.json'))
const db = low(adapter)

db._.mixin({
  desc: (array) => array.reverse(),
})
db._.mixin({
  removeAll: (array) => (array = []),
})

const site = low(new FileSync(path.join(remote.app.getPath('documents'), 'hve-blog/db/site.json')))

export { db, site }

import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'

const posts = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('documents'), 'hve-blog/db/data.db'),
})
const config = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('documents'), 'hve-blog/db/config.db'),
})
const website = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('documents'), 'hve-blog/db/website.db'),
})

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(path.join(remote.app.getPath('documents'), 'hve-blog/db/db.json'))
const db = low(adapter)

const site = low(new FileSync(path.join(remote.app.getPath('documents'), 'hve-blog/db/site.json')))

export { posts, config, website, db, site }

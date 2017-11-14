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

export { posts, config, website }

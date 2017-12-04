import path from 'path'
import { remote } from 'electron'
import fse from 'fs-extra'
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
// 检测是否已经存在 hve-blog文件夹，若不存在，则创建
const documentsPath = remote.app.getPath('documents')
fse.ensureDir(`${documentsPath}/hve-blog`)
console.log('__static', __static)
fse.copy(`${__static}/blog`, `${documentsPath}/hve-blog`)

// db.json
const adapter = new FileSync(path.join(documentsPath, 'hve-blog/db/db.json'))
const db = low(adapter)

db._.mixin({
  desc: (array) => array.reverse(),
})
db._.mixin({
  removeAll: (array) => (array = []),
})

const site = low(new FileSync(path.join(documentsPath, 'hve-blog/db/site.json')))

export { db, site }

import path from 'path'
import { remote } from 'electron'
import fse from 'fs-extra'
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

// 检测是否已经存在 hve-blog文件夹，若不存在，则初始化,这里必须用同步的，不能用异步
const blogPath = path.join(remote.app.getPath('documents'), 'hve-blog')
const exists = fse.pathExistsSync(blogPath)
if (!exists) {
  fse.ensureDirSync(blogPath)
  fse.copySync(`${__static}/blog`, blogPath)
}

// db.json
const db = low(new FileSync(path.join(blogPath, 'db/db.json')))
db._.mixin({ desc: array => array.reverse() })
db._.mixin({ removeAll: array => (array = []) })
// site.json
const site = low(new FileSync(path.join(blogPath, 'db/site.json')))
export { db, site }

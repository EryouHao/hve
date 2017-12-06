import path from 'path'
import { remote } from 'electron'
import fse from 'fs-extra'
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

// 检测是否已经存在 hve-blog文件夹，若不存在，则初始化
const blogPath = path.join(remote.app.getPath('documents'), 'hve-blog')
async function checkBlogDir() {
  try {
    const exists = await fse.pathExists(blogPath)
    if (!exists) {
      await fse.ensureDir(blogPath)
      await fse.copy(`${__static}/blog`, blogPath)
    }
    return Promise.resolve()
  } catch (e) {
    return Promise.reject(e)
  }
}
let db, site
checkBlogDir().then(() => {
  // db.json
  const adapter = new FileSync(path.join(blogPath, 'db/db.json'))
  db = low(adapter)
  db._.mixin({ desc: array => array.reverse() })
  db._.mixin({ removeAll: array => (array = []) })
  console.log('db1: ', db)
  // site.json
  site = low(new FileSync(path.join(blogPath, 'db/site.json')))
}).catch(e => console.log(e))
console.log('db: ', db)
export { db, site }

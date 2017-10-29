const spawn = require('cross-spawn')

export function promiseSpawn(cmd, args, options) {
  if (!cmd) {
    console.log('cmd is required')
  }
  return new Promise((resolve, reject) => {
    const task = spawn(cmd, args, options)
    task.on('close', (code) => {
      if (code === 128) {
        return reject(code)
      }
      resolve({
        status: 'SUCCESS',
      })
    })
  })
}

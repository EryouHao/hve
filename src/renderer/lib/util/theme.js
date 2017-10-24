const fs = require('fs')
const Promise = require('bluebird')
Promise.promisifyAll(fs)
const Estylus = require('electron-stylus')

module.exports = {
  renderStylus(sassPath, cssPath) {
    Estylus(`${sassPath}/style.styl`).then((css) => {
      console.log(css)
      return fs.writeFileAsync(`${cssPath}/style.css`, css)
    })
      .then(() => console.log('render stylus success.'))
      .catch(err => console.log(err))
  },
}

const stylus = require('stylus')
const fs = require('fs')
const Promise = require('bluebird')
Promise.promisifyAll(fs)

module.exports = {
  renderStylus(stylusPath, cssPath) {
    stylus(fs.readFileSync(`${stylusPath}/main.styl`, 'utf8'))
      .set('filename', `${stylusPath}/main.styl`, 'utf8')
      .render((err, css) => {
        if (err) {
          console.log(err)
          return
        }
        fs.writeFileAsync(`${cssPath}/main.css`, css)
          .then(() => console.log('render stylus success.'))
          .catch(err => console.log(err))
      })
  },
}

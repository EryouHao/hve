const stylus = require('stylus')
const fs = require('fs')
const Promise = require('bluebird')
Promise.promisifyAll(fs)

async function renderStylus(stylusPath, cssPath) {
  const stylusStr = await fs.readFileSync(`${stylusPath}/main.styl`, 'utf8')
  const css = await stylus(stylusStr)
    .set('filename', `${stylusPath}/main.styl`, 'utf8')
    .render()
  await fs.writeFileAsync(`${cssPath}/main.css`, css)
  console.log('render css success.')
}

export {
  renderStylus,
}

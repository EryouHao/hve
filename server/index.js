const express = require('express')
const app = express()

// config
const port = 4000

const basePath = '/Users/haoeryou/fed/hve/.tmp/'
// public path
app.use(express.static(basePath))

app.get('/', (req, res) => {
  res.render(basePath)
})

app.listen(port, () => {
  console.log(`Blog running on port ${port}`)
})

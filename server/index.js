const express = require("express")
const app = express()

// config
const port = 4000

const basePath = '/Users/haoeryou/fed/hve/'
// public path
app.use(express.static(basePath + 'public'))


app.get('/',function(req,res){
  res.sendFile(path + 'index.html')
})

app.listen(port, () => {
  console.log(`Blog running on port ${port}`)
})

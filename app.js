const cors = require('cors')
const Controller = require('./controllers/controller')
const express = require('express')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', Controller.getVideos)


app.listen(port, () => {
  console.log(`Gas keun boy ${port}`)
})

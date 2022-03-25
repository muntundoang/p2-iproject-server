if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const cors = require('cors')
const Controller = require('./controllers/controller')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/video', Controller.getVideos)
app.get('/lyric', Controller.getListLyric)
app.get('/lyric/:track_id', Controller.getLyric)
app.post('/login', Controller.login)
app.post('/register', Controller.register)


app.listen(port, () => {
  console.log(`Gas keun boy ${port}`)
})

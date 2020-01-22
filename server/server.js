const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./router/user')
const ioApp = require('./io')

const app = express()

// 启动socket.io
const server = require('http').createServer(app)
ioApp(server)

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(req, res) {
  res.send('<h1>Hello World</h1>')
})

// router
app.use('/user', userRouter)

server.listen(9093, function() {
  console.log('Node app start at port 9093')
})

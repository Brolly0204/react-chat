const mongoose = require('mongoose')

const Chat = mongoose.model('chat')

module.exports = function(server) {
  const io = require('socket.io')(server)

  io.on('connection', socket => {
    socket.on('sendmsg', data => {
      const { from, to, msg } = data
      const chatid = [from, to].sort().join('_')
      Chat.create({ chatid, from, to, content: msg }).then(docs => {
        console.log('docs', docs._doc)
        io.emit('recvmsg', { ...docs._doc })
      })
    })
  })
}

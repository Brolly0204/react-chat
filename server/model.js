const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/im-chat'

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on('connected', function() {
  console.log('mongo connect success')
})

const models = {
  user: {
    user: {
      type: String,
      require: true
    },
    pwd: {
      type: String,
      require: true
    },
    type: {
      type: String,
      require: true
    },
    avatar: {
      // 头像
      type: String
    },
    desc: {
      // 简介
      type: String
    },
    title: {
      type: String
    },
    // 如果是boss 还有俩字段
    company: {
      type: String
    },
    money: {
      type: String
    }
  },
  chat: {
    chatid: { type: String, require: true },
    from: { type: String, require: true },
    to: { type: String, require: true },
    read: { type: Boolean, default: false },
    content: { type: String, require: true, default: '' },
    create_time: {
      type: Number,
      default: Date.now()
    }
  }
}

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel(name) {
    return mongoose.model(name)
  }
}

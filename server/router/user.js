const express = require('express')
const model = require('../model')
const { checkLogin } = require('../middleware/user')
const { md5Pwd } = require('../util/passport')
const { LI_USER_ID } = require('../config')

const User = model.getModel('user')
const Chat = model.getModel('chat')

const router = express.Router()

router.post('/readmsg', (req, res) => {
  const userid = req.cookies[LI_USER_ID]
  const { from } = req.body
  console.log(userid, from)
  Chat.updateMany({ from, to: userid }, { read: true })
    .then(docs => {
      console.log('docs', docs)
      if (docs) {
        res.json({ code: 0, num: docs.nModified })
      } else {
        res.json({ code: 1, msg: '读取失败' })
      }
    })
    .catch(err => res.json({ code: 1, msg: '读取失败' }))
})
router.get('/getmsglist', async (req, res) => {
  const userId = req.cookies[LI_USER_ID]

  const users = {}
  const docs = await User.find({})
  docs.forEach(v => {
    users[v._id] = { name: v.user, avatar: v.avatar }
  })
  const msgs = await Chat.find({ $or: [{ from: userId }, { to: userId }] })
  res.json({ code: 0, data: msgs, users })
})

router.post('/update', checkLogin, (req, res) => {
  const userid = req.cookies[LI_USER_ID]
  User.findByIdAndUpdate(userid, req.body)
    .then(doc => {
      const { user, type } = doc
      const data = { user, type, ...req.body }
      res.json({ code: 0, data })
    })
    .catch(() => {
      res.json({ code: 1, msg: '用户信息保存失败' })
    })
})

router.post('/login', (req, res) => {
  const { user, pwd } = req.body
  User.findOne({ user, pwd: md5Pwd(pwd) }, { pwd: 0, __v: 0 }).then(docs => {
    if (!docs) {
      return res.json({ code: 1, msg: '用户名或密码错误' })
    }
    res.cookie(LI_USER_ID, docs['_id'])
    res.json({ code: 0, data: docs })
  })
})

router.post('/register', (req, res) => {
  const { user, pwd, type } = req.body
  User.findOne({ user }).then(docs => {
    if (docs) {
      res.json({ code: 1, msg: '用户名已注册' })
    } else {
      const userModel = new User({ user, type, pwd: md5Pwd(pwd) })
      userModel
        .save()
        .then(result => {
          if (result) {
            console.log('result', result)
            const { _id, user, type } = result
            res.cookie(LI_USER_ID, _id)
            res.json({ code: 0, data: { _id, user, type } })
          }
        })
        .catch(err => res.json({ code: 1, msg: '用户注册失败' }))
    }
  })
})

router.get('/info', checkLogin, (req, res) => {
  const userid = req.cookies[LI_USER_ID]
  User.findById(userid, { __v: 0, pwd: 0 }).then(doc => {
    if (doc) {
      res.json({ code: 0, data: doc })
    } else {
      res.json({ code: 1, msg: 'userid错误' })
    }
  })
})

router.get('/list', (req, res) => {
  const { type } = req.query
  const query = type ? { type } : {}
  User.find(query).then(docs => {
    res.json({ code: 0, data: docs })
  })
})

router.get('/clear', function(req, res) {
  User.remove({}).then(() => res.json({ msg: 'clear success' }))
})

module.exports = router

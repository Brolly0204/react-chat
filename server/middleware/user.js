const { LI_USER_ID } = require('../config')

exports.checkLogin = (req, res, next) => {
  if (!req.cookies[LI_USER_ID]) {
    return res.json({ code: 1, msg: '用户未登录' })
  }
  next()
}

const utility = require('utility')

function md5Pwd(pwd) {
  const salt = 'brolly_imooc_1224'
  return utility.md5(utility.md5(pwd + salt))
}

module.exports = {
  md5Pwd
}

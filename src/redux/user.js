import axios from 'axios'
import { getRedirectPath } from './util'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const USER_LOGOUT = 'USER_LOGOUT'

const authSuccess = data => ({
  type: AUTH_SUCCESS,
  data
})

const errorMsg = msg => ({
  type: ERROR_MSG,
  msg
})

// reducer
const initState = {
  msg: '',
  user: '',
  type: ''
}
export function user(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        msg: '',
        redirectTo: getRedirectPath(action.data),
        ...action.data
      }
    case LOAD_DATA:
      return {
        ...state,
        ...action.data
      }
    case USER_LOGOUT:
      return {
        ...initState,
        redirectTo: '/login'
      }
    case ERROR_MSG:
      return {
        ...state,
        msg: action.msg,
        user: '',
        type: ''
      }
    default:
      return state
  }
}

// action
// 保存信息
export function logoutSubmit() {
  return { type: USER_LOGOUT }
}

export function update(data) {
  return dispatch =>
    axios.post('/user/update', data).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg || '用户信息保存失败'))
      }
    })
}
export function loadData(user) {
  return { type: LOAD_DATA, data: user }
}

// 登录
export function login({ user, pwd }) {
  if (!user || !pwd) {
    return errorMsg('用户名、密码不能为空')
  }
  return dispatch =>
    axios.post('/user/login', { user, pwd }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        const { data } = res.data
        dispatch(authSuccess(data))
      } else {
        dispatch(errorMsg(res.data.msg || '用户登录失败'))
      }
    })
}

// 注册
export function register({ user, pwd, repeatPwd, type }) {
  if (!user || !pwd) {
    return errorMsg('用户名、密码不能为空')
  }

  if (pwd !== repeatPwd) {
    return errorMsg('密码和确认密码不同')
  }

  return dispatch =>
    axios.post('/user/register', { user, pwd, type }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess({ user, type }))
      } else {
        dispatch(errorMsg(res.data.msg || '注册失败，请重新尝试'))
      }
    })
}

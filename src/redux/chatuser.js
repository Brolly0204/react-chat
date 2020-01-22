import axios from 'axios'

const USER_LIST = 'USER_LIST'

function userList(data) {
  return { type: USER_LIST, data }
}

const initState = {
  userList: []
}

export function chatuser(state = initState, action) {
  switch (action.type) {
    case USER_LIST:
      return {
        ...state,
        userList: [...action.data]
      }
    default:
      return state
  }
}

export function getUserList(type) {
  return dispatch => {
    axios.get(`/user/list?type=${type}`).then(res => {
      if (res.data && res.data.code === 0) {
        console.log(res.data.data)
        dispatch(userList(res.data.data))
      }
    })
  }
}

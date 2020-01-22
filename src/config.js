import axios from 'axios'
import { Toast } from 'antd-mobile'

axios.defaults.timeout = 6000

axios.interceptors.request.use(function(config) {
  Toast.loading('加载中', 0)
  return config
})

axios.interceptors.response.use(
  function(response) {
    Toast.hide()
    return response
  },
  err => {
    Toast.hide()
    return Promise.reject(err)
  }
)

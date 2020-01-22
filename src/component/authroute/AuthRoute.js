import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { loadData } from '../../redux/user'

@withRouter
@connect(null, {
  loadData
})
class AuthRoute extends React.Component {
  componentDidMount() {
    const publicList = ['/login', '/register']
    const { pathname } = this.props.location

    if (publicList.includes(pathname)) {
      return
    }

    axios.get('/user/info').then(res => {
      if (res.status === 200) {
        if (res.data.code === 0) {
          console.log('有登陆信息')
          this.props.loadData(res.data.data)
        } else {
          this.props.history.push('/login')
        }
      }
      // console.log(res.data)
    })
  }
  render() {
    return null
  }
}

export default AuthRoute

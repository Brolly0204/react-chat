import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import NavLinkBar from '../navlink/navlink'
import Boss from '../boss/Boss'
import Genius from '../genius/Genius'
import User from '../user/User'
import Msg from '../msg/Msg'
import { getMsgList, recvMsg } from '../../redux/chat'

@connect(state => state, {
  getMsgList,
  recvMsg
})
class DashBoard extends React.Component {
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  render() {
    const { user, location } = this.props
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: 'BOSS列表',
        component: Genius,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]
    return (
      <div>
        <NavBar className="fixd-header" mode="dark">
          {(navList.find(v => v.path === location.pathname) || {}).title}
        </NavBar>
        <div className="dashboard">
          <Switch>
            {navList.map(v => {
              return (
                <Route
                  key={v.path}
                  path={v.path}
                  component={v.component}
                ></Route>
              )
            })}
          </Switch>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )
  }
}

export default DashBoard

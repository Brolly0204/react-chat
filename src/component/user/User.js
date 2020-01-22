import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import cookies from 'browser-cookies'
import { logoutSubmit } from '../../redux/user'

const { Item } = List
const { Brief } = Item
const { alert } = Modal

@connect(state => state.user, { logoutSubmit })
class User extends Component {
  handleLogout = () => {
    alert('注销', '确认退出登录？', [
      {
        text: 'Cancel',
        onPress: () => console.log('cancel')
      },
      {
        text: 'Ok',
        onPress: () => {
          cookies.erase('LI_USER_ID')
          this.props.logoutSubmit()
        }
      }
    ])
  }
  render() {
    const {
      avatar,
      user,
      title,
      type,
      company,
      desc,
      money,
      redirectTo
    } = this.props
    return user ? (
      <div>
        <Result
          img={
            <img
              style={{ width: 50 }}
              src={require(`../img/${avatar}.png`)}
              alt="avatar"
            />
          }
          title={user}
          message={type === 'boss' ? company : null}
        />
        <List renderHeader={'简介'}>
          <Item multipleLine>
            {title}
            <Brief>
              <pre>{desc}</pre>
              {type === 'genius' ? `薪资：${money}` : null}
            </Brief>
          </Item>
        </List>
        <WhiteSpace />
        <List>
          <Item onClick={this.handleLogout}>退出登录</Item>
        </List>
      </div>
    ) : (
      <Redirect to={redirectTo} />
    )
  }
}

export default User

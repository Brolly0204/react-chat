import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button,
  NoticeBar
} from 'antd-mobile'
import { login } from '../../redux/user'
import Logo from '../../component/logo/Logo'
import imoocForm from '../../component/imooc-form/imooc-form'

@connect(state => state.user, { login })
@imoocForm
class Login extends Component {
  handleLogin = () => {
    this.props.login(this.props.state)
  }
  register = () => {
    this.props.history.push('/register')
  }
  render() {
    const { redirectTo, msg, handleChange } = this.props
    return (
      <div>
        {redirectTo && redirectTo !== '/login' ? (
          <Redirect to={redirectTo} />
        ) : null}
        <Logo />
        <WingBlank>
          {msg ? <NoticeBar icon={null}>{msg}</NoticeBar> : null}
          <List>
            <InputItem onChange={v => handleChange('user', v)}>用户</InputItem>
            <InputItem type="password" onChange={v => handleChange('pwd', v)}>
              密码
            </InputItem>
          </List>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleLogin}>
            登录
          </Button>
          <WhiteSpace />
          <Button type="primary" onClick={this.register}>
            注册
          </Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login

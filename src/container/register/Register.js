import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  List,
  Radio,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button,
  NoticeBar
} from 'antd-mobile'
import { register } from '../../redux/user'
import Logo from '../../component/logo/Logo'
import imoocForm from '../../component/imooc-form/imooc-form'
import './register.css'

const RadioItem = Radio.RadioItem

@connect(state => state.user, {
  register
})
@imoocForm
class Register extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     user: '',
  //     pwd: '',
  //     repeatPwd: '',
  //     type: ''
  //   }
  // }

  handleRegister = () => {
    this.props.register(this.props.state)
  }

  render() {
    const { msg, redirectTo, handleChange } = this.props
    return (
      <div>
        {redirectTo ? <Redirect to={redirectTo} /> : null}
        <Logo />
        <WingBlank>
          {msg ? <NoticeBar icon={null}>{msg}</NoticeBar> : null}
          <List>
            <InputItem onChange={v => handleChange('user', v)}>
              用户名
            </InputItem>
            <InputItem type="password" onChange={v => handleChange('pwd', v)}>
              密码
            </InputItem>
            <InputItem
              type="password"
              onChange={v => handleChange('repeatPwd', v)}
            >
              确认密码
            </InputItem>
            <WhiteSpace />
            <RadioItem
              onChange={() => handleChange('type', 'genius')}
              key={'genius'}
              checked={this.props.state.type === 'genius'}
            >
              牛人
            </RadioItem>
            <RadioItem
              onChange={() => handleChange('type', 'boss')}
              key={'boss'}
              checked={this.props.state.type === 'boss'}
            >
              BOSS
            </RadioItem>
          </List>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleRegister}>
            注册
          </Button>
        </WingBlank>
      </div>
    )
  }
}

export default Register

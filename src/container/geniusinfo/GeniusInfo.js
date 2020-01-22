import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  NavBar,
  InputItem,
  TextareaItem,
  Button,
  WhiteSpace,
  WingBlank
} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector'
import { update } from '../../redux/user'

@connect(state => state.user, {
  update
})
class GeniusInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      money: '',
      desc: '',
      avatar: ''
    }
  }
  update = () => {
    this.props.update(this.state)
  }
  handleChange = (key, val) => {
    this.setState({
      [key]: val
    })
  }
  selectAvatar = avatarName => {
    this.setState({
      avatar: avatarName
    })
  }
  render() {
    const {
      redirectTo,
      location: { pathname }
    } = this.props
    return (
      <div>
        {redirectTo && redirectTo !== pathname ? (
          <Redirect to={redirectTo} />
        ) : null}
        <NavBar mode="dark">牛人完善信息页</NavBar>
        <AvatarSelector selectAvatar={this.selectAvatar}></AvatarSelector>
        <WhiteSpace />
        <InputItem onChange={v => this.handleChange('title', v)}>
          求职岗位
        </InputItem>
        <InputItem onChange={v => this.handleChange('money', v)}>
          薪资要求
        </InputItem>
        <TextareaItem
          title="个人简介"
          rows={3}
          onChange={v => this.handleChange('desc', v)}
        ></TextareaItem>
        <WhiteSpace />
        <WingBlank>
          <Button onClick={this.update} type="primary">
            保存信息
          </Button>
        </WingBlank>
      </div>
    )
  }
}

export default GeniusInfo

import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserCard from '../usercard/UserCard'
import { getUserList } from '../../redux/chatuser'

@connect(state => state.chatuser, {
  getUserList
})
class Genius extends Component {
  componentDidMount() {
    this.getUserList()
  }
  getUserList = () => {
    this.props.getUserList('boss')
  }
  render() {
    const { userList } = this.props
    return <UserCard userList={userList} />
  }
}

export default Genius

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

const { Item } = List
const Brief = Item.Brief

@connect(state => state)
class Msg extends Component {
  getLast = arr => {
    return arr[arr.length - 1]
  }
  render() {
    const { users, chatmsg } = this.props.chat
    const msgGroup = {}
    chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const a_last = this.getLast(a).create_time
      const b_last = this.getLast(b).create_time
      return b_last - a_last
    })
    const userid = this.props.user._id
    return (
      <div>
        <List>
          {chatList.map(v => {
            console.log(v)
            const item = this.getLast(v)
            const targetId = v[0].from === userid ? v[0].to : v[0].from
            const unread = v.filter(i => !i.read && i.to === userid).length
            return (
              <Item
                key={item._id}
                extra={<Badge text={unread}></Badge>}
                thumb={require(`../img/${users[targetId].avatar}.png`)}
                arrow="horizontal"
                onClick={() => {
                  this.props.history.push(`/chat/${targetId}`)
                }}
              >
                {item.content}
                <Brief>{users[targetId].name}</Brief>
              </Item>
            )
          })}
        </List>
      </div>
    )
  }
}

export default Msg

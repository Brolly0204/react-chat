import React from 'react'
import { connect } from 'react-redux'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { getMsgList, sendMsg, recvMsg, readMsg } from '../../redux/chat'
import { getChatID } from '../../util'

const Item = List.Item

const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
  .split(' ')
  .filter(v => v)
  .map(v => ({
    text: v
  }))

@connect(state => state, {
  getMsgList,
  sendMsg,
  recvMsg,
  readMsg
})
class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      showEmoji: false
    }
  }
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
    this.handleReadMsg()
  }
  componentWillUnmount() {
    this.handleReadMsg()
  }
  handleReadMsg = () => {
    const to = this.props.match.params.user
    this.props.readMsg(to)
  }
  handleSubmit = () => {
    // 发送方
    const from = this.props.user._id
    // 接收方
    const to = this.props.match.params.user
    // 消息
    const msg = this.state.text
    // 开始发送
    this.props.sendMsg({ from, to, msg })
    this.setState({ text: '' })
  }
  handleText = text => {
    this.setState({ text })
  }
  handleShowEmoji = () => {
    this.setState({
      showEmoji: !this.state.showEmoji
    })
    this.fixeCourse()
  }
  fixeCourse = () => {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }
  goBack = () => {
    this.props.history.goBack()
  }
  render() {
    const { user: userId } = this.props.match.params
    let { users, chatmsg } = this.props.chat
    if (!users[userId]) return null
    const chatid = getChatID(userId, this.props.user._id)
    chatmsg = chatmsg.filter(v => v.chatid === chatid)
    return (
      <div id="chat-page">
        <NavBar
          icon={<Icon type="left" />}
          mode="dark"
          onLeftClick={this.goBack}
        >
          {users[userId].name}
        </NavBar>
        <div id="chat-list">
          {chatmsg.map(v => {
            console.log(users, v.from)
            const avatar = require(`../img/${users[v.from].avatar}.png`)
            return v.from === this.props.user._id ? (
              <List key={v._id}>
                <Item
                  className="chat-me"
                  extra={<img src={avatar} alt="avatar" />}
                >
                  {v.content}
                </Item>
              </List>
            ) : (
              <List key={v._id}>
                <Item className="chat-he" thumb={avatar}>
                  {v.content}
                </Item>
              </List>
            )
          })}
        </div>
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              onChange={this.handleText}
              extra={
                <div>
                  <span
                    onClick={this.handleShowEmoji}
                    style={{ marginRight: 10 }}
                  >
                    😘
                  </span>
                  <span onClick={this.handleSubmit}>发送</span>
                </div>
              }
            ></InputItem>
          </List>
          {this.state.showEmoji ? (
            <Grid
              data={emoji}
              columnNum={9}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={el => {
                this.setState({
                  text: this.state.text + el.text
                })
              }}
            />
          ) : null}
        </div>
      </div>
    )
  }
}

export default Chat

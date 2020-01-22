import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'

@withRouter
class UserCard extends Component {
  static propTypes = {
    userList: PropTypes.array.isRequired
  }
  handleClick = v => {
    this.props.history.push(`/chat/${v._id}`)
  }
  render() {
    const { userList } = this.props
    const { Header, Body } = Card
    return (
      <WingBlank>
        <WhiteSpace />
        {userList.map(
          v =>
            v.avatar && (
              <div key={v._id}>
                <WhiteSpace />
                <Card onClick={() => this.handleClick(v)}>
                  <Header
                    title={v.user}
                    thumb={require(`../img/${v.avatar}.png`)}
                    extra={<span>{v.title}</span>}
                  ></Header>
                  <Body>
                    <div>
                      {v.type === 'boss' ? <div>公司：{v.company}</div> : null}
                      <div>薪资：{v.money}</div>
                      <div>
                        <pre>{v.desc}</pre>
                      </div>
                    </div>
                  </Body>
                </Card>
              </div>
            )
        )}
      </WingBlank>
    )
  }
}

export default UserCard

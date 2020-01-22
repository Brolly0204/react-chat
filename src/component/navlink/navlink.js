import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'

@withRouter
@connect(state => state.chat)
class NavLinkBar extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  }
  handleSelect = tab => {
    this.props.history.push(tab)
  }
  render() {
    const {
      data,
      location: { pathname }
    } = this.props
    const navList = data.filter(v => !v.hide)
    return (
      <TabBar>
        {navList.map(v => {
          return (
            <TabBar.Item
              badge={v.path === '/msg' ? this.props.unread : 0}
              title={v.text}
              key={v.path}
              icon={{ uri: require(`./img/${v.icon}.png`) }}
              selectedIcon={{ uri: require(`./img/${v.icon}-active.png`) }}
              selected={pathname === v.path}
              onPress={() => this.handleSelect(v.path)}
            ></TabBar.Item>
          )
        })}
      </TabBar>
    )
  }
}

export default NavLinkBar

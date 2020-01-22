import React, { Component } from 'react'
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends Component {
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }
  state = {
    icon: '',
    text: ''
  }
  render() {
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
      .split(',')
      .map(v => ({
        icon: require(`../img/${v}.png`),
        text: v
      }))
    const gridHeader = this.state.icon ? (
      <div>
        <span style={{ verticalAlign: 'middle' }}>已选择头像：</span>
        <img
          style={{ verticalAlign: 'middle' }}
          width="20px"
          src={this.state.icon}
          alt={this.state.text}
        />
      </div>
    ) : (
      <div style={{ height: '20px' }}>请选择头像：</div>
    )
    return (
      <div>
        <List renderHeader={gridHeader}>
          <Grid
            onClick={avatar => {
              this.setState(avatar)
              this.props.selectAvatar(avatar.text)
            }}
            data={avatarList}
            columnNum={5}
          />
        </List>
      </div>
    )
  }
}

export default AvatarSelector

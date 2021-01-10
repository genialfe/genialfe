import React from 'react'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import './style.less'

export interface IAvatarProps {
  avatar?: string
  name?: string
  location?: string
}

export default class UserAvatar extends React.Component<IAvatarProps, any> {
  render() {
    const { name, location } = this.props
    return (
      <div className="avatarContainer">
        <Avatar size={64} icon={<UserOutlined />} />
        <p className="userName">{name}</p>
        <p className="userLocation">{location}</p>
      </div>
    )
  }
}

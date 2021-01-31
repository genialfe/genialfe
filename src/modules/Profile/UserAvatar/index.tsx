import React from 'react'
import { Avatar } from 'antd'

import './style.less'

export interface IAvatarProps {
  avatarUrl?: string
  name?: string
  location?: string
}

export default class UserAvatar extends React.Component<IAvatarProps, any> {
  render() {
    const { name, location, avatarUrl } = this.props
    return (
      <div className="avatarContainer">
        <Avatar size={64} src={avatarUrl} />
        <p className="userName">{name}</p>
        <p className="userLocation">{location}</p>
      </div>
    )
  }
}

import React from 'react'
import { Card } from 'antd'
import UserAvatar from './UserAvatar'
import UserIntroduction from './UserIntroduction'
import UserInterests from './UserInterests'

import './style.less'
import ConnectionBar from './ConnectionBar'

export interface IProfileProps {
  name?: string
  location?: string
  selfIntroduction?: string
  interests?: string[]
  connections?: number
}

export default class Profile extends React.Component<IProfileProps, any> {
  render() {
    const {
      selfIntroduction,
      interests,
      connections,
      ...restProps
    } = this.props
    return (
      <>
        <Card>
          <UserAvatar {...restProps} />
          <UserIntroduction content={selfIntroduction} />
          <UserInterests interests={interests} />
          <ConnectionBar connectionNum={connections} />
        </Card>
      </>
    )
  }
}

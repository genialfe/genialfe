import React from 'react'
import { Card } from 'antd'
import UserAvatar from './UserAvatar'
import UserIntroduction from './UserIntroduction'
import UserInterests from './UserInterests'

import './style.css'
import ConnectionBar from './ConnectionBar'

export interface IProfileProps {
  name?: string
  location?: string
  introduction?: string
  interests?: string[]
  connections?: number
}

export default class Profile extends React.Component <IProfileProps, any> {

  render() {
    const { introduction, interests, connections, ...restProps} = this.props
    return (
      <div className='container'>
        <Card>
          <UserAvatar 
            {...restProps}
          />
          <UserIntroduction
            content={introduction}
           />
          <UserInterests
            interests={interests}
          />
          <ConnectionBar
            connectionNum={connections}
          />
        </Card>
      </div>
    )
  }
}

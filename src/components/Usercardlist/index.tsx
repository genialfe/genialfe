import React from 'react'

import { List } from 'antd'

import Usercard from '../Usercard'

const data = [
  {
    userAvatarLink:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    userName:"userName",
    userDescription:"userDescription",
    userDetails:"userDetails"
  },
  {
    userAvatarLink:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    userName:"用户名字",
    userDescription:"用户描述",
    userDetails:"用户详细信息"
  }
]

export interface IUserCardListProps {
  UserData:Array<any>;
}

export default class Usercardlist extends React.Component <IUserCardListProps, any> {
  render() {
    // const { UserData } = this.props
    return (
      <div>
        <List
          itemLayout="horizontal"
          dataSource={data}
          split={false}
          renderItem={item => (
            <List.Item>
              <Usercard
                userAvatarLink = {item.userAvatarLink}
                userName={item.userName}
                userDescription={item.userDescription}
                userDetails={item.userDetails}
              />
            </List.Item>
          )}
        />
      </div>
    )
  }
}
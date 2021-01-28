import React from 'react'
import { List } from 'antd'
import Usercard from './Usercard'
import { EHomeItemType } from '..'
import EndCard from '../../../components/EndCard'

const data = [
  {
    userAvatarLink:
      'https://s3.amazonaws.com/lunch-club-images/20200916-1b5b787e.png',
    userName: '巴鲁索',
    location: '上海',
    userDetails: '巴鲁索来自印度，是特斯拉的软件开发工程师，目前在上海工作。'
  },
  {
    userAvatarLink:
      'https://s3.amazonaws.com/lunch-club-images/20200904-22c21297.png',
    userName: '韦伯',
    location: '上海',
    userDetails:
      '韦伯是移动和AI革命的先驱和连续企业家，收到了NYT，WSJ和ABC的关注。他是世界上第一个构建移动AI机器人和移动在线视频游戏的人。'
  },
  {
    userAvatarLink:
      'https://s3.amazonaws.com/lunch-club-images/20200421-2debb0ca.png',
    userName: '芈昱廷',
    location: '北京',
    userDetails: '芈昱廷是中国职业围棋选手，多次获得国内与国际大赛的冠军。'
  },
  {
    userAvatarLink:
      'https://s3.amazonaws.com/lunch-club-images/20200819-513db568.png',
    userName: '曼',
    location: '上海',
    userDetails:
      '曼是SF的全栈软件工程师，喜欢学习新技术并与他人合作。她目前正在寻找自己的第一个全职角色。'
  }
]

export interface IUserCardListProps {
  /**
   * 用户列表数据
   */
  UserData?: Array<any>
  /**
   * 卡片列表类型
   */
  type: EHomeItemType
}

export default class Usercardlist extends React.Component<
  IUserCardListProps,
  any
> {
  render() {
    // const { UserData } = this.props
    const { type } = this.props
    return (
      <div>
        {type === EHomeItemType.Explore && (
          <List
            itemLayout="horizontal"
            dataSource={data}
            split={false}
            renderItem={item => (
              <List.Item>
                <Usercard
                  userAvatarLink={item.userAvatarLink}
                  userName={item.userName}
                  location={item.location}
                  userDetails={item.userDetails}
                />
              </List.Item>
            )}
          />
        )}
        {type === EHomeItemType.Connection && <EndCard />}
      </div>
    )
  }
}

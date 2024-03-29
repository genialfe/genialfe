/* eslint-disable no-restricted-globals */
import React from 'react'
import { observer } from 'mobx-react'
import { action, makeObservable, observable } from 'mobx'
import { Typography, Card, Avatar, message } from 'antd'
import { meetPeopleLikeThis } from '../../api'
import { EHomeItemType } from '../..'

import './style.less'

const { Meta } = Card

const { Title, Paragraph, Link } = Typography

export interface IUserCardProps {
  userAvatarLink: string
  userName: string
  matchSource: string
  userDetails: string
  type?: EHomeItemType
  userId: string
}

@observer
export default class Usercard extends React.Component<IUserCardProps, any> {
  isClicked: boolean = false

  setButtonClicked(clicked: boolean) {
    this.isClicked = clicked
  }

  async handleClickMeetButton(userId: string) {
    const hide = message.loading('提交中...')
    const meetRes = await meetPeopleLikeThis(userId)
    if (meetRes.code === 200) {
      this.setButtonClicked(true)
      hide()
    } else if (meetRes.code === 401) {
      location.pathname = '/'
    }
  }

  constructor(props: IUserCardProps) {
    super(props)
    makeObservable(this, {
      isClicked: observable,
      setButtonClicked: action
    })
  }

  render() {
    const {
      userAvatarLink,
      userName,
      matchSource,
      userDetails,
      userId
    } = this.props

    return (
      <div style={{ width: '100%' }}>
        <Card className="card">
          <Meta
            avatar={<Avatar size="large" src={userAvatarLink} />}
            title={userName}
            description={matchSource}
            className="cardMeta"
          />
          <Typography style={{ marginTop: 16 }}>
            <Title level={5}>
              想要匹配像<Link>{userName}</Link>的人?
            </Title>
            <Paragraph>{userDetails}</Paragraph>
          </Typography>
          <button
            className={this.isClicked ? 'meetButtonClicked' : 'meetButton'}
            onClick={() => this.handleClickMeetButton(userId)}
            disabled={this.isClicked}
          >
            {this.isClicked
              ? `我们会帮你寻找更多像${userName}的人!`
              : `希望认识${userName}`}
          </button>
        </Card>
      </div>
    )
  }
}

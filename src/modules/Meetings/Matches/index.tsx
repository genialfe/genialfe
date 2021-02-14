/* eslint-disable no-restricted-globals */
import React from 'react'
import { observer } from 'mobx-react'
import { action, makeObservable, observable } from 'mobx'
import { Button, Empty, message, Timeline, Modal } from 'antd'
import { CheckCircleOutlined, UserSwitchOutlined } from '@ant-design/icons'
import { enterMeeting, getMatchDetail, getMatchesMonthly } from '../api'
import { IVideoCallProps } from '../VideoCall'
import UserAvatar from '../../Profile/UserAvatar'

import './style.less'

export interface IMatchUserProfile {
  userName: string
  headImg: string
  introduction: string
}
export interface IMatchesProps {
  /**
   * 设置开始视频会议的回调函数
   */
  setIsVideoCallMethod: (value: boolean) => void
  /**
   * 设置视频会议参数的回调函数
   */
  setVideoCallParams: (value: IVideoCallProps) => void
}

export interface IMatch {
  id: string
  matchId: string
  signTime: string
}

@observer
export default class Matches extends React.Component<IMatchesProps, any> {
  isMobileScreen: boolean = false
  agoraAppId: string = '2bdbb08e0cf743009ff6385d632b6417'
  meetingToken: string = ''
  channel: string = ''
  hasNoMatch: boolean = false
  matches: IMatch[] = []

  setMatches(matches: IMatch[]) {
    this.matches = matches
  }

  setHasNoMatch(value: boolean) {
    this.hasNoMatch = value
  }

  setMeetingToken(token: string) {
    this.meetingToken = token
  }

  setChannel(channel: string) {
    this.channel = channel
  }

  setIsMobileScreen(value: boolean) {
    this.isMobileScreen = value
  }

  async getMatches() {
    const matchRes = await getMatchesMonthly()
    if (matchRes.code === 200) {
      const { data } = matchRes
      if (!data.length) {
        // 目前还没有匹配
        this.setHasNoMatch(true)
      } else {
        this.setHasNoMatch(false)
        this.setMatches(data)
      }
    } else if (matchRes.code === 401) {
      location.pathname = '/'
    }
  }

  async handleEnterMeeting(matchId: string) {
    // matchId是匹配id 也是会议的channel
    const { setIsVideoCallMethod, setVideoCallParams } = this.props
    const enterMeetingRes = await enterMeeting(matchId)
    const meetingStatus = enterMeetingRes.data.status
    const meetingToken = enterMeetingRes.data.callToken
    if (meetingStatus === 2) {
      message.info('会议尚未开始')
    } else if (meetingStatus === 3) {
      message.info('会议已经过期')
    } else if (meetingStatus === 1) {
      if (meetingToken) {
        setVideoCallParams({
          channel: matchId,
          token: meetingToken,
          appid: this.agoraAppId
        })
        setIsVideoCallMethod(true)
      } else {
        message.info('出错了：丢失视频通话token')
      }
    }
  }

  async handleGetMatchDetail(matchId: string) {
    const res = await getMatchDetail(matchId)
    if (!res.data) {
      message.info('已经无法查看')
    } else {
      const profile: IMatchUserProfile = res.data
      Modal.info({
        width: this.isMobileScreen ? '100%' : '40%',
        title: '对方信息',
        icon: <UserSwitchOutlined />,
        closable: true,
        okText: '关闭',
        content: (
          <div style={{ textAlign: 'left' }}>
            <UserAvatar
              avatarUrl={profile.headImg}
              name={profile.userName}
              size={49}
            />
            <div className="introContainer">
              <p className="introTitle">简介</p>
              <p className="introContent">{profile.introduction}</p>
            </div>
          </div>
        )
      })
    }
  }

  get matchesContent() {
    const content = this.matches.map(item => {
      return (
        <Timeline.Item color="green" dot={<CheckCircleOutlined />}>
          <div className="matchCard">
            <div className="matchesContainer">
              <div>
                <span>时间：{item.signTime}</span>
                <br />
                <span>会议id：{item.matchId}</span>
              </div>
              <div>
                <Button
                  type="link"
                  className="enterMeetingButton"
                  // style={{ color: 'blue'}}
                  onClick={() => this.handleEnterMeeting(item.matchId)}
                >
                  加入会议
                </Button>
                <Button
                  type="link"
                  className="enterMeetingButton"
                  style={{ color: 'grey' }}
                  onClick={() => this.handleGetMatchDetail(item.matchId)}
                >
                  查看详情
                </Button>
              </div>
            </div>
          </div>
        </Timeline.Item>
      )
    })

    return <Timeline>{content}</Timeline>
  }

  componentDidMount() {
    this.getMatches()
    const isMobileScreen = window.matchMedia('(max-width:500px)').matches
    this.setIsMobileScreen(isMobileScreen)
  }

  constructor(props: IMatchesProps) {
    super(props)
    makeObservable(this, {
      matches: observable,
      hasNoMatch: observable,
      meetingToken: observable,
      channel: observable,
      setMatches: action,
      setHasNoMatch: action,
      setMeetingToken: action,
      setChannel: action
    })
  }

  render() {
    return (
      <div>
        {this.hasNoMatch && (
          <Empty
            description={<span>暂时还没有匹配</span>}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
        {this.matchesContent}
        <p style={{ color: 'gray' }}>- 建议使用PC端Chrome浏览器开启会议</p>
      </div>
    )
  }
}

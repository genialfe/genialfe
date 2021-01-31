import React from 'react'
import { observer } from 'mobx-react'
import { action, makeObservable, observable } from 'mobx'
import { Button, Empty, message, Timeline } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'
import { enterMeeting, getMatchesMonthly } from '../api'
import { IVideoCallProps } from '../VideoCall'

import './style.less'

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
  // agoraAppId: string = '2bdbb08e0cf743009ff6385d632b6417'
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

  async getMatches() {
    const matchRes = await getMatchesMonthly()
    console.log('matchResL:', matchRes)
    if (matchRes.code === 200) {
      const { data } = matchRes
      if (!data.length) {
        // 目前还没有匹配
        this.setHasNoMatch(true)
      } else {
        this.setHasNoMatch(false)
        this.setMatches(data)
      }
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
          token: meetingToken
        })
        setIsVideoCallMethod(true)
      } else {
        message.info('出错了：丢失视频通话token')
      }
    }

    setVideoCallParams({
      channel: matchId,
      token: meetingToken
    })
    setIsVideoCallMethod(true)
  }

  get matchesContent() {
    const content = this.matches.map(item => {
      return (
        <Timeline.Item color="green" dot={<CheckCircleOutlined />}>
          <div className="matchCard">
            <div style={{ margin: '1em' }}>
              <span>时间：{item.signTime}</span>
              <br />
              <span>会议id：{item.matchId}</span>
              <Button
                type="link"
                style={{ float: 'right' }}
                onClick={() => this.handleEnterMeeting(item.matchId)}
              >
                加入会议
              </Button>
            </div>
          </div>
        </Timeline.Item>
      )
    })

    return <Timeline>{content}</Timeline>
  }

  componentDidMount() {
    this.getMatches()
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
        {this.hasNoMatch && <Empty description={<span>暂时还没有匹配</span>} />}
        {this.matchesContent}

        {/* {
          this.isMeetingMethod &&
          <VideoCall
            token={this.meetingToken}
            channel={this.channel} 
          />
        } */}
      </div>
    )
  }
}

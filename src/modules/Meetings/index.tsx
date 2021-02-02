import React from 'react'
// import { Calendar } from 'antd'
import { observer } from 'mobx-react'
import { action, makeObservable, observable } from 'mobx'
import Times from './Times'
import Matches from './Matches'
import VideoCall, { IVideoCallProps } from './VideoCall'

import './style.less'

export interface IMeetingsProps {}

export interface IMeeting {
  /**
   * 当前用户id
   */
  id: string
  /**
   * 匹配id
   */
  matchId: string
  /**
   * 会议时间
   */
  signTime: string
}

@observer
export default class Meetings extends React.Component<IMeetingsProps, any> {
  meetings: IMeeting[] = []

  // for testing video call
  isVideoCallMethod: boolean = false

  videoCallParams: IVideoCallProps = {
    token: '',
    channel: '',
    appid: ''
  }

  setIsVideoCallMethod(value: boolean) {
    this.isVideoCallMethod = value
  }

  setVideoCallParams(params: IVideoCallProps) {
    this.videoCallParams = params
  }

  getListData(value: any) {
    let listData
    console.log(value.month())
    switch (value.date()) {
      case 8:
        listData = [{ type: 'warning', content: 'This is warning event.' }]
        break
      case 10:
        listData = [{ type: 'warning', content: 'This is warning event.' }]
        break
      case 15:
        listData = [{ type: 'warning', content: 'This is warning event' }]
        break
      default:
    }
    return listData || []
  }

  dateCellRender(value: any) {
    const listData = this.getListData(value)
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>{item.content}</li>
        ))}
      </ul>
    )
  }

  constructor(props: IMeetingsProps) {
    super(props)
    this.setIsVideoCallMethod = this.setIsVideoCallMethod.bind(this)
    this.setVideoCallParams = this.setVideoCallParams.bind(this)
    makeObservable(this, {
      isVideoCallMethod: observable,
      videoCallParams: observable,
      setIsVideoCallMethod: action,
      setVideoCallParams: action
    })
  }

  render() {
    const mockVideocallProps = {
      token:
        '00605b68aaaf43c49cdac56bbe0dd961cfbIACf2CHTDM+h5hKG2Z6ivyBcttR9wkHGLqYWTbz+Xew6fAx+f9gAAAAAEAAH/YchSBsaYAEAAQA8Gxpg',
      channel: 'test',
      appid: '05b68aaaf43c49cdac56bbe0dd961cfb'
    }
    return (
      <div className="meetingsContainer">
        {/* <div className="meetingsCalendarContainer">
          <Calendar dateCellRender={value => this.dateCellRender(value)} />
        </div> */}
        {!this.isVideoCallMethod && (
          <>
            <div className="meetingsBlockContainer">
              <div className="chosenTimeContainer">
                <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
                  已匹配完成的会议
                </p>
                <Matches
                  setIsVideoCallMethod={this.setIsVideoCallMethod}
                  setVideoCallParams={this.setVideoCallParams}
                />
              </div>
            </div>

            <div className="meetingsBlockContainer">
              <div className="chosenTimeContainer">
                <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
                  已为下周选择的时间段
                </p>
                <Times />
              </div>
            </div>
          </>
        )}
        {/* {this.isVideoCallMethod && <VideoCall {...mockVideocallProps} />} */}
        {this.isVideoCallMethod && <VideoCall {...this.videoCallParams} />}
      </div>
    )
  }
}

import { Calendar } from 'antd'
import React from 'react'

import './style.less'

export interface IMeetingsProps {}

export interface IMeeting {
  /**
   * 腾讯会议链接
   */
  url: string
  /**
   * 时间（时间戳）
   */
  time: number
  /**
   * 对方的名字
   */
  userName: string
  /**
   * 会议号
   */
  meetingId: string
}

export default class Meetings extends React.Component<IMeetingsProps, any> {
  meetings: IMeeting[] = []

  getListData(value: any) {
    let listData
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

  render() {
    return (
      <div className="meetingsContainer">
        <Calendar dateCellRender={value => this.dateCellRender(value)} />
      </div>
    )
  }
}

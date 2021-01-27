import React from 'react'
import { Calendar } from 'antd'
import Times from './Times'
import Matches from './Matches'

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

export default class Meetings extends React.Component<IMeetingsProps, any> {
  meetings: IMeeting[] = []

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

  render() {
    return (
      <>
        {/* <div className="meetingsCalendarContainer">
          <Calendar dateCellRender={value => this.dateCellRender(value)} />
        </div> */}
        <div className='meetingsBlockContainer'>
          <div className='chosenTimeContainer'>
            <p style={{fontSize: '18px', fontWeight: 'bold'}}>已匹配完成的会议</p>
            <Matches />
          </div>
        </div>

        <div className='meetingsBlockContainer'>
          <div className='chosenTimeContainer'>
            <p style={{fontSize: '18px', fontWeight: 'bold'}}>已选择的下周空闲时间段</p>
            <Times />
          </div>
        </div>
      </>
    )
  }
}

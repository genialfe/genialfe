/* eslint-disable no-restricted-globals */
import { Button, Empty, message, Timeline } from 'antd'
import { makeObservable, observable, action } from 'mobx'
import { observer } from 'mobx-react'
import React from 'react'
import { ClockCircleOutlined } from '@ant-design/icons'
import Skipped from '../../../static/skip-week.svg'
import { cancelSkipThisWeek } from '../../Weekly/api'
import { getAvailableTimesAndMatchStatus } from '../api'

import './style.less'

const { Item } = Timeline

export interface ITimesProps {}

@observer
export default class Times extends React.Component<ITimesProps, any> {
  times: string[] = []
  hasSkippedThisWeek: boolean = false
  disableEditTime: boolean = false

  setTimes(times: string[]) {
    this.times = times
  }

  setDisableEditTime(value: boolean) {
    this.disableEditTime = value
  }

  setHasSkippedThisWeek(value: boolean) {
    this.hasSkippedThisWeek = value
  }

  get bookedTimes() {
    const timesContent = this.times.map(time => {
      return <Item dot={<ClockCircleOutlined />}>{time}</Item>
    })
    return <Timeline>{timesContent}</Timeline>
  }

  async getAvailableTimes() {
    const res = await getAvailableTimesAndMatchStatus()
    let hasSkipped = false
    let disableEditTime = false
    res.data.forEach((item: { signTime: string; signStatus: number }) => {
      if (item.signStatus === 3) {
        // 用户已经跳过下周匹配
        hasSkipped = true
      } else if (item.signStatus === 1 || item.signStatus === 2) {
        // 如果已经完成匹配 就不允许用户修改下周预约的时间
        disableEditTime = true
      }
    })

    this.setHasSkippedThisWeek(hasSkipped)
    this.setDisableEditTime(disableEditTime)

    if (!hasSkipped) {
      const times = res.data.map((item: { signTime: string }) => item.signTime)
      this.setTimes(times)
    }
  }

  handleReSubmitTime() {
    location.pathname = '/weekly'
  }

  async handleCancelSkip() {
    const res = await cancelSkipThisWeek()
    if (res.code === 200) {
      location.pathname = '/weekly'
    } else {
      message.info('出错了')
    }
  }

  componentDidMount() {
    this.getAvailableTimes()
  }

  constructor(props: ITimesProps) {
    super(props)
    makeObservable(this, {
      times: observable,
      hasSkippedThisWeek: observable,
      disableEditTime: observable,
      setTimes: action,
      setHasSkippedThisWeek: action,
      setDisableEditTime: action
    })
  }

  render() {
    const noTime = this.times.length === 0
    return (
      <div>
        {!this.hasSkippedThisWeek && (
          <>
            {!noTime && (
              <div className="timesContainer">{this.bookedTimes}</div>
            )}
            {noTime && (
              <Empty
                description={<span>没有为下周选择时间段</span>}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
            <Button
              onClick={this.handleReSubmitTime}
              block
              style={{ marginTop: '10px' }}
              disabled={this.disableEditTime}
            >
              {noTime ? '添加时间' : '修改时间'}
            </Button>
          </>
        )}
        {this.hasSkippedThisWeek && (
          <>
            <Empty
              image={Skipped}
              imageStyle={{
                height: 80,
                marginBottom: 24
              }}
              description={
                <span style={{ color: 'rgba(0, 0, 0, 0.25)' }}>
                  你已经选择跳过这周
                </span>
              }
            >
              <Button type="primary" onClick={this.handleCancelSkip}>
                重新选择
              </Button>
            </Empty>
          </>
        )}
      </div>
    )
  }
}

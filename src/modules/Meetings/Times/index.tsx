/* eslint-disable no-restricted-globals */
import { Button, Empty, message, Timeline } from 'antd'
import { makeObservable, observable, action } from 'mobx'
import { observer } from 'mobx-react'
import React from 'react'
import { ClockCircleOutlined } from '@ant-design/icons'
import Skipped from '../../../static/skip-week.svg'
import { cancelSkipThisWeek } from '../../Weekly/api'
import { getReservedTimesAndMatchStatus } from '../api'

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
    const timesContent = this.times.map((time, index) => {
      return (
        <Item key={index} dot={<ClockCircleOutlined />}>
          {time}
        </Item>
      )
    })
    return <Timeline>{timesContent}</Timeline>
  }

  // 获取已经预约的时间 以及用户状态：是否已经跳过下周 & 是否已经完成匹配 已经完成匹配则不能修改
  async getReservedTimes() {
    let hasSkipped = false
    let disableEditTime = false

    const res = await getReservedTimesAndMatchStatus()
    const { data } = res
    if (data) {
      if (data.status === 4) {
        // 用户已经选择跳过这周
        hasSkipped = true
      } else if (data.status === 3) {
        // 已经匹配成功
        disableEditTime = true
      }
    }

    this.setHasSkippedThisWeek(hasSkipped)
    this.setDisableEditTime(disableEditTime)

    if (!hasSkipped) {
      const times = res.data.list.map(
        (item: { signTime: string }) => item.signTime
      )
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
    this.getReservedTimes()
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

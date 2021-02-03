/* eslint-disable no-restricted-globals */
import { Button, Empty, Timeline } from 'antd'
import { makeObservable, observable, action } from 'mobx'
import { observer } from 'mobx-react'
import React from 'react'
import { ClockCircleOutlined } from '@ant-design/icons'
import { getAvailableTimesAndMatchStatus } from '../api'
import Skipped from '../../../static/skip-week.svg'


import './style.less'

const { Item } = Timeline

export interface ITimesProps {}

@observer
export default class Times extends React.Component<ITimesProps, any> {
  times: string[] = []
  hasSkippedThisWeek: boolean = false

  setTimes(times: string[]) {
    this.times = times
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
    res.data.forEach((item: {signTime: string, signStatus: number}) => {
      if(item.signStatus === 3) {
        hasSkipped = true
      }
    })
    this.setHasSkippedThisWeek(hasSkipped)

    if(!hasSkipped) {
      const times = res.data.map((item: { signTime: string }) => item.signTime)
      this.setTimes(times)
    }
  }

  handleReSubmitTime() {
    location.pathname = '/weekly'
  }

  componentDidMount() {
    this.getAvailableTimes()
  }

  constructor(props: ITimesProps) {
    super(props)
    makeObservable(this, {
      times: observable,
      hasSkippedThisWeek: observable,
      setTimes: action,
      setHasSkippedThisWeek: action
    })
  }

  render() {
    const noTime = this.times.length === 0
    return (
      <div>
        {
          !this.hasSkippedThisWeek &&
          <>
            {!noTime && <div className="timesContainer">{this.bookedTimes}</div>}
            {noTime && <Empty description={<span>没有为下周选择时间段</span>} image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            <Button
              onClick={this.handleReSubmitTime}
              block
              style={{ marginTop: '10px' }}
            >
              {noTime ? '添加时间' : '修改时间'}
            </Button>
          </>
        }
        {
          this.hasSkippedThisWeek &&
          <>
            <Empty
              image={Skipped}
              imageStyle={{
                height: 80,
                marginBottom: 24
              }}
              description={
                <span style={{color: 'rgba(0, 0, 0, 0.25)'}}>
                  你已经选择跳过这周
                </span>
              }
            >
              <Button type="primary" onClick={this.handleReSubmitTime}>重新选择</Button>
            </Empty>
          </>
        }
      </div>
    )
  }
}

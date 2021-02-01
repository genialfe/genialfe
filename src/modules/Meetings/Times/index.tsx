/* eslint-disable no-restricted-globals */
import { Button, Empty, Timeline } from 'antd'
import { makeObservable, observable, action } from 'mobx'
import { observer } from 'mobx-react'
import React from 'react'
import { ClockCircleOutlined } from '@ant-design/icons'
import { getAvailableTimes } from '../api'

import './style.less'

const { Item } = Timeline

export interface ITimesProps {}

@observer
export default class Times extends React.Component<ITimesProps, any> {
  times: string[] = []

  setTimes(times: string[]) {
    this.times = times
  }

  get bookedTimes() {
    const timesContent = this.times.map(time => {
      return <Item dot={<ClockCircleOutlined />}>{time}</Item>
    })
    return <Timeline>{timesContent}</Timeline>
  }

  async getAvailableTimes() {
    const res = await getAvailableTimes()
    const times = res.data.map((item: { signTime: string }) => item.signTime)
    this.setTimes(times)
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
      setTimes: action
    })
  }

  render() {
    const noTime = this.times.length === 0
    return (
      <div>
        {!noTime && <div className="timesContainer">{this.bookedTimes}</div>}
        {noTime && <Empty description={<span>没有为下周选择时间段</span>} />}

        <Button
          onClick={this.handleReSubmitTime}
          block
          style={{ marginTop: '10px' }}
        >
          {noTime ? '添加时间' : '修改时间'}
        </Button>
      </div>
    )
  }
}

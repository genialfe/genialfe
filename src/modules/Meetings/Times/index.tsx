/* eslint-disable no-restricted-globals */
import { Button, Timeline } from 'antd'
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
    return (
      <div>
        <div className="timesContainer">{this.bookedTimes}</div>
        <Button onClick={this.handleReSubmitTime}>修改时间</Button>
      </div>
    )
  }
}

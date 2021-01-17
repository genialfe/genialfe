import React from 'react'
import { Button, Col, Row } from 'antd'
import { makeObservable, computed, observable, action } from 'mobx'
import { observer } from 'mobx-react'

import './style.less'

export interface IWeeklyProps {}

export interface IAvailableTime {
  day: string
  hour: string
}

@observer
export default class Weekly extends React.Component<IWeeklyProps, any> {
  days: string[] = ['1', '2', '3', '4', '5', '6']
  hours: string[] = [
    '09',
    // '10',
    '11',
    // '12',
    '13',
    // '14',
    '15',
    // '16',
    '17',
    // '18',
    '19',
    // '20',
    '21'
  ]

  // 存储选中的时间段
  selectedTimeMap: IAvailableTime[] = []

  // 在selectedMap中设置时间段选中的状态
  setDayHourSelectedState(day: string, hour: string) {
    const index = this.selectedTimeMap.findIndex(item => {
      return item.day === day && item.hour === hour
    })

    if (index > -1) {
      // 该日该时间段已经被选择过
      this.selectedTimeMap.splice(index, 1)
    } else {
      this.selectedTimeMap.push({ day, hour })
    }
  }

  // 点击每一个button 选中对应的时间段
  handleClickTimeButton(day: string, hour: string) {
    this.setDayHourSelectedState(day, hour)
  }

  getButtonClassName(day: string, hour: string) {
    const isButtonSelected = this.selectedTimeMap.some(item => {
      return item.day === day && item.hour === hour
    })
    return isButtonSelected ? 'timeButtonSelected' : 'timeButton'
  }

  handleSubmitTime() {
    const selectedTimes = this.selectedTimeMap.map(item => {
      return {
        day: item.day,
        hour: item.hour
      }
    })
    console.log('map:', selectedTimes)
    // location.pathname = 'meetings'
  }

  get timeSelectTitle() {
    const titleRow = [
      {
        day: '星期一',
        date: '1-11'
      },
      {
        day: '星期二',
        date: '1-12'
      },
      {
        day: '星期三',
        date: '1-13'
      },
      {
        day: '星期四',
        date: '1-14'
      },
      {
        day: '星期五',
        date: '1-15'
      },
      {
        day: '星期六',
        date: '1-16'
      }
    ]
    return (
      <Row>
        {titleRow.map((item, index) => {
          return (
            <Col span={4}>
              <div className="timeSelectTitle">
                <p className="day">{item.day}</p>
                <p className="date">{item.date}</p>
              </div>
            </Col>
          )
        })}
      </Row>
    )
  }

  get timeSelectArea() {
    return this.hours.map((hour, index) => {
      return (
        <Row>
          {this.days.map((day, index) => {
            return (
              <Col span={4}>
                <button
                  className={this.getButtonClassName(day, hour)}
                  onClick={() => this.handleClickTimeButton(day, hour)}
                >
                  {`${hour}:00`}
                </button>
              </Col>
            )
          })}
        </Row>
      )
    })
  }

  get submitButton() {
    return (
      <Button
        type="primary"
        size="large"
        onClick={() => this.handleSubmitTime()}
      >
        提交
      </Button>
    )
  }

  constructor(props: IWeeklyProps) {
    super(props)
    makeObservable(this, {
      selectedTimeMap: observable,
      timeSelectArea: computed,
      timeSelectTitle: computed,
      setDayHourSelectedState: action
    })
  }

  render() {
    return (
      <div className="weeklyContainer">
        <p className="weeklyTitle">为你的会议安排时间</p>
        <p className="weeklyExp">
          在下面的表格中选择你有空的时间段，点击即可选中。
        </p>
        <p className="weeklyExp">
          你可以选择任意多个时间段，但是我们根据你选择的时间只会为你安排一场会议。
        </p>
        <div className="timePickerContainer">
          {this.timeSelectTitle}
          {this.timeSelectArea}
        </div>
        {this.submitButton}
      </div>
    )
  }
}

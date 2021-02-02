/* eslint-disable no-restricted-globals */
import React from 'react'
import { Button, Col, message, Row } from 'antd'
import { makeObservable, computed, observable, action } from 'mobx'
import { observer } from 'mobx-react'
import moment from 'moment'
import { setAvailableTimes } from './api'

import './style.less'

export interface IWeeklyProps {}

export interface IAvailableTime {
  /**
   * 日期(几月几号)
   */
  date: string
  /**
   * 几点
   */
  hour: string
  /**
   * 格式化后的日期(YYYY-MM-DD)
   */
  formatDate: string
}

export interface IWeekday {
  /**
   * 星期几
   */
  day: string
  /**
   * 日期(展示在顶部title)
   */
  date: string
  /**
   *  格式化后的日期 api用
   */
  formatDate: string
}

@observer
export default class Weekly extends React.Component<IWeeklyProps, any> {
  // days: string[] = ['1', '2', '3', '4', '5', '6']
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

  days: IWeekday[] = []

  // 存储选中的时间段
  selectedTimeMap: IAvailableTime[] = []

  // 在selectedMap中设置时间段选中的状态
  setDayHourSelectedState(date: string, formatDate: string, hour: string) {
    const index = this.selectedTimeMap.findIndex(item => {
      return item.date === date && item.hour === hour
    })

    if (index > -1) {
      // 该日该时间段已经被选择过
      this.selectedTimeMap.splice(index, 1)
    } else {
      this.selectedTimeMap.push({ date, formatDate, hour })
    }
  }

  setDays(days: IWeekday[]) {
    this.days = days
  }

  // 点击每一个button 选中对应的时间段
  handleClickTimeButton(day: string, formatDate: string, hour: string) {
    this.setDayHourSelectedState(day, formatDate, hour)
  }

  handleSkipThisWeek() {
    location.pathname = '/meetings'
  }

  getButtonClassName(day: string, hour: string) {
    const isButtonSelected = this.selectedTimeMap.some(item => {
      return item.date === day && item.hour === hour
    })
    return isButtonSelected ? 'timeButtonSelected' : 'timeButton'
  }

  async handleSubmitTime() {
    const selectedTimes = this.selectedTimeMap.map(item => {
      return `${item.formatDate} ${item.hour}:00:00`
    })
    const times = selectedTimes.join()
    const res = await setAvailableTimes(times)
    if (res.code === 200) {
      location.pathname = '/meetings'
    } else if (res.code === 401) {
      message.info('登录过期，请重新登录')
      location.pathname = '/'
    } else {
      message.info('出错了，请检查后重试')
    }
  }

  get timeSelectTitle() {
    const week = ['星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
    const nextTuesday = moment().startOf('isoWeek').add(1, 'day').add(1, 'week')
    const weekdays = [
      {
        date: nextTuesday.format('MM月DD日'),
        formatDate: nextTuesday.format('YYYY-MM-DD')
      }
    ]
    for (let i = 0; i < 5; i++) {
      // 得到下周一至下周六的日期数组
      const day = nextTuesday.add(1, 'days')
      const date = day.format('MM月DD日')
      const formatDate = day.format('YYYY-MM-DD')
      weekdays.push({ date, formatDate })
    }
    const days = weekdays.map((item, index) => {
      return {
        day: week[index], // 星期几
        date: item.date,
        formatDate: item.formatDate
      }
    })
    this.setDays(days)

    return (
      <Row>
        {days.map((item, index) => {
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
                  className={this.getButtonClassName(day.date, hour)}
                  onClick={() =>
                    this.handleClickTimeButton(day.date, day.formatDate, hour)
                  }
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
    const hasSelectedTime = (this.selectedTimeMap.length !== 0)
    return (
      <Button
        type="primary"
        size="large"
        onClick={() => {hasSelectedTime ? this.handleSubmitTime() : this.handleSkipThisWeek() } }
      >
        {hasSelectedTime ? '提交' : '跳过这周'}
      </Button>
    )
  }

  constructor(props: IWeeklyProps) {
    super(props)
    makeObservable(this, {
      selectedTimeMap: observable,
      days: observable,
      timeSelectArea: computed,
      timeSelectTitle: computed,
      setDayHourSelectedState: action,
      setDays: action
    })
  }

  render() {
    return (
      <div className="weeklyContainer">
        <p className="weeklyTitle">为你下周的会议安排时间</p>
        <p className="weeklyExp">
          在下面的表格中选择下周你有空的时间段(最多选择七个)。
        </p>
        <p className="weeklyExp">我们会从中选择一个时间段为你安排会议。</p>
        <div className="timePickerContainer">
          {this.timeSelectTitle}
          {this.timeSelectArea}
        </div>
        {this.submitButton}
      </div>
    )
  }
}

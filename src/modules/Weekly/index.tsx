/* eslint-disable no-restricted-globals */
import React from 'react'
import { Button, Col, message, Row, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { makeObservable, computed, observable, action } from 'mobx'
import { observer } from 'mobx-react'
import moment from 'moment'
import { setAvailableTimes, skipThisWeek } from './api'

import './style.less'

const { confirm } = Modal

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
      if (this.selectedTimeMap.length < 1) {
        this.selectedTimeMap.push({ date, formatDate, hour })
      } else {
        message.info('最多选择一个时间段')
      }
    }
  }

  setDays(days: IWeekday[]) {
    this.days = days
  }

  // 点击每一个button 选中对应的时间段
  handleClickTimeButton(day: string, formatDate: string, hour: string) {
    this.setDayHourSelectedState(day, formatDate, hour)
  }

  async handleSkipThisWeek() {
    const res = await skipThisWeek()
    if (res.code === 200) {
      message.info('设置成功！本周将不会为你安排任何匹配')
      setTimeout(() => (location.pathname = '/home'), 800)
    }
  }

  getButtonClassName(day: string, hour: string) {
    const isButtonSelected = this.selectedTimeMap.some(item => {
      return item.date === day && item.hour === hour
    })
    return isButtonSelected ? 'timeButtonSelected' : 'timeButton'
  }

  handleSubmitTime() {
    const submitTime = async () => {
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

    confirm({
      title: '确认提交该时间段？',
      icon: <ExclamationCircleOutlined />,
      content:
        "请确保该时间段可以使用电脑上线参加会议。如果暂时无法确定下周的空闲时间段，可以先选择'跳过这周'，当能够确定时间段后，再前往会议页面选择时间段。",
      onOk() {
        submitTime()
      },
      okText: '确认',
      cancelText: '取消'
    })
  }

  get timeSelectTitle() {
    const week = ['星期二', '星期三', '星期四', '星期五', '星期六', '星期日']

    // 如果当前时间是周日晚上九点之后 则显示下下周的时间表
    const isSundayEvening = moment().weekday() === 0 && moment().hour() >= 21
    const nextTuesday = isSundayEvening
      ? moment().startOf('isoWeek').add(1, 'day').add(2, 'week')
      : moment().startOf('isoWeek').add(1, 'day').add(1, 'week')
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
    const hasSelectedTime = this.selectedTimeMap.length !== 0
    return (
      <Button
        type="primary"
        size="large"
        onClick={() => {
          hasSelectedTime ? this.handleSubmitTime() : this.handleSkipThisWeek()
        }}
      >
        {hasSelectedTime ? '提交' : '跳过这周'}
      </Button>
    )
  }

  componentDidMount() {
    const needSelectionFirst = sessionStorage.getItem('need_time_selection')
    if (needSelectionFirst === '1') {
      message.info('请先为下周的匹配选择适合你的时间')
      sessionStorage.removeItem('need_time_selection')
    }
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
        <p className="weeklyExp">在下面的表格中选择一个下周你有空的时间段。</p>
        {/* <p className="weeklyExp">我们会从中选择一个时间段为你安排会议。</p> */}
        <div className="timePickerContainer">
          {this.timeSelectTitle}
          {this.timeSelectArea}
        </div>
        {this.submitButton}
      </div>
    )
  }
}

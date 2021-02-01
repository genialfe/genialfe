import React from 'react'
import { Tag } from 'antd'

import './style.less'

export interface IUserInterestProps {
  /**
   * 用户兴趣
   */
  interests: string
}

export default class UserInterests extends React.Component<
  IUserInterestProps,
  any
> {
  get tagList() {
    const { interests } = this.props
    const mockInterests = '篮球,音乐,围棋,足球运动,天使投资,社会活动,慈善,书法,艺术'
    const interestsArray = mockInterests.split(',')
    return interestsArray.map((item, index) => {
      return (
        <Tag color="#333366" key={index} className="tag">
          {item}
        </Tag>
      )
    })
  }

  render() {
    return (
      <div className="container">
        <p className="introTitle">兴趣</p>
        <div style={{display: 'flex'}}>
          <div>
            {this.tagList}
          </div>
          <div>
            2134
          </div>


        </div>
      </div>
    )
  }
}

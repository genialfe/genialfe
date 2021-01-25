import React from 'react'
import { Tag } from 'antd'

import './style.less'

export interface IUserInterestProps {
  interests?: string[]
}

export default class UserInterests extends React.Component<
  IUserInterestProps,
  any
> {
  get tagList() {
    const { interests } = this.props
    return interests?.map((item, index) => {
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
        <p className="title">兴趣</p>
        {this.tagList}
      </div>
    )
  }
}

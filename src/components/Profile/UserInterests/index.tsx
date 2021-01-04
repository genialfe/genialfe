import React from 'react'
import { Tag } from 'antd'

export interface IUserInterestProps {
  interests?: string[]
}

// 标签自己封装一个

export default class UserInterests extends React.Component<
  IUserInterestProps,
  any
> {
  get tagList() {
    const { interests } = this.props
    return interests?.map((item, index) => {
      return (
        <Tag color="#2db7f5" key={index}>
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

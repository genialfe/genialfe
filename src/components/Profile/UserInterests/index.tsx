import React from 'react'
import { Tag } from 'antd'
import { business, sciTech, social } from '../../Register/Interests/constants'

import './style.less'

export interface IUserInterestProps {
  interests?: string[]
}

export default class UserInterests extends React.Component<
  IUserInterestProps,
  any
> {
  get tagList() {
    const allInterestsMap = [...business, ...sciTech, ...social]
    const { interests } = this.props
    return interests?.map((item, index) => {
      const targetItem = allInterestsMap.find(mapItem => mapItem.name === item)
      return (
        <Tag color="#333366" key={index} className="tag">
          {targetItem?.desc}
        </Tag>
        // <div className='interestsTag'>
        //   <p className='interests'>{item}</p>
        // </div>
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

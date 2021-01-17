import React from 'react'
import { SolutionOutlined } from '@ant-design/icons'
import Avatar1 from '../../../../static/readyPage/avatar1.svg'
import Avatar2 from '../../../../static/readyPage/avatar2.svg'
import Avatar3 from '../../../../static/readyPage/avatar3.svg'

import './style.less'

export interface IIntroExample {
  introduction: string
  avatar: string
}
export default class SampleIntros extends React.Component {
  examples: IIntroExample[] = [
    {
      introduction: '吕建君是微软的软件开发工程师，最近正在寻找新的工作机会。',
      avatar: Avatar1
    },
    {
      introduction: '高瀚熠是墨尔本大学的新生，对古典音乐有浓厚的兴趣。',
      avatar: Avatar2
    },
    {
      introduction: '崔文正是七牛云Pandora数据分析平台的负责人。',
      avatar: Avatar3
    }
  ]

  get examplesContent() {
    return this.examples.map(item => {
      return (
        <div className="example">
          <img src={item.avatar} alt="" className="avatar" />
          {item.introduction}
        </div>
      )
    })
  }

  render() {
    return (
      <div className="sampleIntroContainer">
        <p className="sampleTitle">
          <SolutionOutlined />
          示例
        </p>
        {this.examplesContent}
      </div>
    )
  }
}

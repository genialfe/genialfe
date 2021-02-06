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
      introduction:
        '李晓去年毕业于北京大学，现在在阿里担任后端开发工程师，他希望成长为一位优秀的架构师。除了在软件开发方面有浓厚的兴趣，他还对西方古典艺术了解颇多。',
      avatar: Avatar1
    },
    {
      introduction:
        '尉迟英对MR/VR/AR和金融科技交叉的领域感兴趣。在过去5年中，他为定量房地产基金建立了ML交易系统以及全栈解决方案。目前，他正在从事金融科技/游戏/社交领域的项目。',
      avatar: Avatar2
    },
    {
      introduction:
        '张天泽是一位企业家，发起了一笔种子基金，用于投资阿根廷，智利，秘鲁，哥伦比亚和乌拉圭。她目前正在为自己的风投筹集资金，用于投资技术创业公司，使人们能够追求更有意义的生活，尤其是在金融科技，教育科技，食品科技和可持续发展方面。',
      avatar: Avatar3
    }
  ]

  get examplesContent() {
    return this.examples.map(item => {
      return (
        <div className="example">
          <img src={item.avatar} alt="" className="customAvatar" />
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

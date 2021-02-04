import React from 'react'
import { Collapse, Typography } from 'antd'
// import {
//   PrinterTwoTone
// } from '@ant-design/icons'
import { content } from './constants'

import './style.less'

const { Title, Paragraph } = Typography
const { Panel } = Collapse

export interface IQAProps {}

export default class QA extends React.Component<IQAProps, any> {
  get qaContent() {
    return content.map((item, index) => {
      return (
        <div key={index}>
          <Title level={4}>{item.question}</Title>
          <Paragraph>{item.answer}</Paragraph>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="qaContainer">
        <Title level={3} style={{ marginLeft: '6px' }}>
          FAQ
        </Title>
        {/* {this.qaContent} */}

        <Collapse bordered={false} defaultActiveKey={['1']}>
          <Panel
            header={<p className="panelHeader">Genial是做什么的？</p>}
            key="1"
          >
            <p className="panelContent" style={{ lineHeight: 2 }}>
              Genial是一个1:1的专业社交平台：通过AI算法帮助你每周匹配一个想见的人，通过视频会议的方式见面，助力你的生涯发展。
            </p>
          </Panel>
          <Panel
            header={
              <p className="panelHeader">Genial的使用流程具体是怎样的？</p>
            }
            key="2"
          >
            <p className="panelContent">1. 选择目标、兴趣并介绍自己；</p>
            <p className="panelContent">2. 选择下一周有空的时间；</p>
            <p className="panelContent">
              3. 周日晚上平台会将下周你的匹配对象和会议时间通过短信发送给你；
            </p>
            <p className="panelContent">
              4. 会议时间前30分钟平台会发送短信提醒，到时间后进入会议室。
            </p>
          </Panel>
          <Panel
            header={<p className="panelHeader">如何提升自己的体验？</p>}
            key="3"
          >
            <p className="panelContent">
              - 完善自己的资料，AI将会提供更适合你的匹配对象
            </p>
            <p className="panelContent">- 使用Genial平台上的积分</p>
          </Panel>
          <Panel header={<p className="panelHeader">如何使用积分？</p>} key="4">
            <p className="panelContent">1. 特定的匹配需求</p>
            <p className="panelContent">
              如果你想要寻找特定需求的匹配，则每次匹配需要花费30积分。
            </p>
            <p className="panelContent">2. 进行多次匹配</p>
            <p className="panelContent">
              如果你想要一周进行一次以上的匹配，则每增加一次10积分。
            </p>
          </Panel>
          <Panel header={<p className="panelHeader">如何获得积分？</p>} key="5">
            <p className="panelContent">- 完成一次会议：积分+2</p>
            <p className="panelContent">- 邀请朋友加入Genial：积分+5</p>
            <p className="panelContent">- 邀请的朋友参加第一次会议：积分+5</p>
          </Panel>
          <Panel header={<p className="panelHeader">如何联系我们？</p>} key="6">
            <p className="panelContent">
              - 有任何问题或建议可
              <a href="mailto:genialtech@126.com" rel="nofollow" style={{color: 'blue'}}>
                发送邮件
              </a>
              到genialtech@126.com，并备注你的手机号。
            </p>
            <p className="panelContent">
              - 如果你有紧急的问题需要解决，可拨打13661498269
            </p>
          </Panel>
        </Collapse>
      </div>
    )
  }
}

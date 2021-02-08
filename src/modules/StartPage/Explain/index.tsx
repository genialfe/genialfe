import React from 'react'
import { Col, Row } from 'antd'
// import Step1 from '../../../static/step1.svg'
// import Step2 from '../../../static/step2.svg'
// import Step3 from '../../../static/step3.svg'

import './style.less'

export interface IExplainProps {}

export default class Explain extends React.Component<IExplainProps, any> {
  render() {
    return (
      <div className="desc">
        <p className="expTitle">Genial如何运作</p>
        <Row>
          <Col span={8}>
            {/* <img src={Step1} className="expImg" alt=""></img> */}
            <img
              src="https://oss.genial.ltd/a8cfd/2e957eb8c030fc2d10de5607715f4c55.svg"
              className="expImg"
              alt=""
            ></img>
            <p className="expText">告诉Genial你的背景、目标和兴趣</p>
          </Col>
          <Col span={8}>
            {/* <img src={Step2} className="expImg" alt=""></img> */}
            <img
              src="https://oss.genial.ltd/a8cfd/9b782e40768fc9007786b032ba7911aa.svg"
              className="expImg"
              alt=""
            ></img>
            <p className="expText">每周选择：你是否想进行新的匹配</p>
          </Col>
          <Col span={8}>
            <img
              src="https://oss.genial.ltd/a8cfd/36129a68e34a0c182d4e7ad279e7bd86.svg"
              className="expImg"
              alt=""
            ></img>
            {/* <img src={Step3} className="expImg" alt=""></img> */}
            <p className="expText">Genial会通过AI为你安排一对一的视频会话</p>
          </Col>
        </Row>
      </div>
    )
  }
}

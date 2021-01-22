import React from 'react'
import { Col, Row } from 'antd'
// import { ForwardOutlined } from '@ant-design/icons'
import Weekly from '../../../static/readyPage/weekly.svg'
import Intro from '../../../static/readyPage/intro.svg'
import Connect from '../../../static/readyPage/connect.png'

import './style.less'

export default class DescBlock extends React.Component {
  render() {
    return (
      <>
        <Row>
          <Col span={8}>
            <div>
              <img src={Weekly} alt="" />
              <p className="exp">每周登录来获得匹配</p>
            </div>
          </Col>
          <Col span={8}>
            <div>
              <img src={Intro} alt="" />
              <p className="exp">我们通过短信通知你和对方</p>
            </div>
          </Col>
          <Col span={8}>
            <div>
              <img src={Connect} alt="" />
              <p className="exp">通过腾讯会议和对方交流</p>
            </div>
          </Col>
        </Row>
      </>
    )
  }
}

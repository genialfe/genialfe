/* eslint-disable no-restricted-globals */
import React from 'react'
import { Row, Col } from 'antd'
import LoginPic from '../../static/cities-graphic.svg'


export default class BlockPage extends React.Component {
  redirectToStartPage() {
    location.pathname = '/'
  }

  render() {

    return (
      <div className="loginContainer">
        <Row gutter={[0, 36]}>
          <Col span={24}>
            <p className="logo" onClick={() => this.redirectToStartPage()}>
              Genial
            </p>
          </Col>
        </Row>
        <Row gutter={[0, 36]}>
          <Col span={24}>
            <p>Hi，Genial平台现在只能通过注册用户的邀请链接登录注册。</p>
            <p>您可询问是否有朋友已经加入Genial。</p>
            <p>但同时，我们正准备逐步开放让更多的朋友加入Genial。</p>
            <p>当我们开放新一轮注册名额时，我们会第一时间通过短信通知您！</p>
            <img src={LoginPic} className="loginImg" alt="login"></img>
          </Col>
        </Row>
      </div>
    )
  }
}
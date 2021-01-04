import React from 'react'
import { Button, Col, Divider, Input, message, Row } from 'antd'
import { makeObservable, observable, action, computed } from 'mobx'
import { observer } from 'mobx-react'
import { isPhoneNumber } from '../../utils/validate'
import LoginPic from '../../static/cities-graphic.svg'

import './style.css'

export interface ILoginProps {}

@observer
export default class Login extends React.Component<ILoginProps, any> {
  hasSentVerifyCode: boolean = false
  phoneNumber: string = ''
  verifyCode: string = ''

  get loginButton() {
    return this.hasSentVerifyCode ? (
      <Button
        type="primary"
        className="loginButton"
        size="large"
        onClick={() => this.handleSubmitVerifyCode()}
      >
        提交验证码
      </Button>
    ) : (
      <Button
        type="primary"
        className="loginButton"
        size="large"
        onClick={() => this.handleSendVerifyCode()}
      >
        发送验证码
      </Button>
    )
  }

  setPhoneNumber(number: string) {
    this.phoneNumber = number
  }

  setHasSentVerifyCode(value: boolean) {
    this.hasSentVerifyCode = value
  }

  setVerifyCode(code: string) {
    this.verifyCode = code
  }

  handleSendVerifyCode() {
    if (isPhoneNumber(this.phoneNumber)) {
      console.log('phoneNum:', this.phoneNumber)
      message.info(`已向 ${this.phoneNumber} 发送验证码`)
      this.setHasSentVerifyCode(true)
    } else {
      message.info('请输入合法的中国大陆手机号')
      console.log('ao')
    }
  }

  handleSubmitVerifyCode() {
    console.log('verifyCode:', this.verifyCode)
  }

  constructor(props: ILoginProps) {
    super(props)
    makeObservable(this, {
      phoneNumber: observable,
      hasSentVerifyCode: observable,
      loginButton: computed,
      setPhoneNumber: action,
      setHasSentVerifyCode: action,
      setVerifyCode: action
    })
  }

  render() {
    return (
      <div className="loginContainer">
        <Row gutter={[0, 36]}>
          <Col span={24}>
            <p className="logo">Genial</p>
          </Col>
        </Row>
        <Row gutter={[0, 36]}>
          <Col span={24}>
            <h3 className="loginSlogan">登陆</h3>
            <img src={LoginPic} alt="login"></img>
          </Col>
        </Row>
        <Row gutter={[0, 36]}>
          <Col span={6} offset={9}>
            <Input
              onChange={(e: any) => this.setPhoneNumber(e.target.value)}
              placeholder="你的中国大陆手机号"
              size="large"
            />
            <Divider />
            {this.hasSentVerifyCode && (
              <Input
                className="verifyCodeInput"
                onChange={(e: any) => this.setVerifyCode(e.target.value)}
                placeholder="请输入验证码"
                size="large"
              />
            )}
          </Col>
        </Row>
        <Row>
          <Col span={6} offset={9}>
            {this.loginButton}
          </Col>
        </Row>
      </div>
    )
  }
}

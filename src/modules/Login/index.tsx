/* eslint-disable no-restricted-globals */
import React from 'react'
import { Button, Col, Divider, Input, message, Row } from 'antd'
import { makeObservable, observable, action, computed } from 'mobx'
import { observer } from 'mobx-react'
import Cookies from 'universal-cookie'
import { isPhoneNumber } from '../../utils/validate'
import LoginPic from '../../static/cities-graphic.svg'
import { getUserStatus, sendVerificationCode } from '../Register/apis'
import { login } from './api'

import './style.less'

const cookies = new Cookies()

export interface ILoginProps {}

export interface IUserProfile {
  goalIds: string
  headImg: string
  interest: string
  interestIds: string
  introduction: string
  point: number
  userName: string
}

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
        onClick={() => this.handleSendVerificationCode()}
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

  async handleSendVerificationCode() {
    const phone = this.phoneNumber
    if (isPhoneNumber(phone)) {
      const inviteCode = sessionStorage.getItem('inviteCode')
      const userStatus = await getUserStatus(
        phone,
        inviteCode ? inviteCode : '-1'
      )
      if (userStatus.data.userStatus !== 1) {
        // status为1 为已注册用户
        message.info('请先去注册')
      } else {
        // 发送登陆验证码流程
        const res = await sendVerificationCode({
          type: 2, // 登录type为2
          phone
        })
        const status = res.data.status
        if (status === 1) {
          message.info(`已向 ${phone} 发送验证码`)
          this.setHasSentVerifyCode(true)
        } else if (status === 2) {
          message.info('已发送过验证码，请勿重复操作')
        } else if (status === 3) {
          message.info('出错了，请稍后重试')
        }
      }
    } else {
      message.info('请输入合法的中国大陆手机号')
    }
  }

  async handleSubmitVerifyCode() {
    const code = this.verifyCode
    const phone = this.phoneNumber
    const loginRes = await login({ code, phone })

    const { loginStatus, token, ...userProfile } = loginRes.data

    if (loginStatus === 1) {
      // 成功登陆
      sessionStorage.setItem('profile', JSON.stringify(userProfile))
      sessionStorage.setItem('login', '1')
      cookies.set('token', token)
      location.pathname = '/home'
    } else if (loginStatus === 2) {
      message.info('验证码已过期')
    } else if (loginStatus === 3) {
      message.info('验证码错误')
    }
  }

  redirectToStartPage() {
    location.pathname = '/'
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
    // const isMobileScreen = window.matchMedia('(max-width:500px)').matches
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
            <h3 className="loginSlogan">登录</h3>
            <img src={LoginPic} className="loginImg" alt="login"></img>
          </Col>
        </Row>

        <div className="loginInputContainer">
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
          {this.loginButton}
        </div>
      </div>
    )
  }
}

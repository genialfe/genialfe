/* eslint-disable no-restricted-globals */
import React from 'react'
import { Input, message } from 'antd'
import { observer } from 'mobx-react'
import { makeObservable, observable } from 'mobx'
import { getUserStatus, sendVerificationCode } from '../../Register/apis'

import './style.less'

export interface ISignUpProps {}

const { Search } = Input

@observer
export default class SignUp extends React.Component<ISignUpProps, any> {
  hasSentMsg: boolean = false

  isPhoneNumber(number: string) {
    const reg = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/
    return reg.test(number)
  }

  illegalPhoneNumberAlert() {
    message.info('请输入合法的手机号码')
  }

  switchHasSentMsg() {
    this.hasSentMsg = true
  }

  async handleSendMsg(number: string) {
    const statusRes = await getUserStatus(number)
    console.log('status', statusRes)
    const userStatus = statusRes.data.userStatus
    if (userStatus === 1) {
      message.info('已经是注册用户，请去登录')
    } else if (userStatus === 2) {
      message.info('账号已禁用')
    } else {
      // 用户在注册中
      const res = await sendVerificationCode({
        phone: number,
        type: 1
      })
      const status = res.data.status
      if (status === 1) {
        location.pathname = '/register'
      } else if (status === 2) {
        message.info('验证码发送失败，请稍后重试。')
      } else if (status === 3) {
        message.info('发送过于频繁，请稍后再试。')
      }
    }
  }

  constructor(props: ISignUpProps) {
    super(props)
    makeObservable(this, {
      hasSentMsg: observable
    })
  }

  render() {
    const onSubmitPhoneNumber = (number: string) => {
      if (this.isPhoneNumber(number)) {
        sessionStorage.setItem('phoneNumber', number)
        this.handleSendMsg(number)
        this.switchHasSentMsg()
      } else {
        this.illegalPhoneNumberAlert()
      }
    }

    return (
      <div className="signUpContainer">
        <p className="slogan">开始和精英建立你们之间的联系吧</p>
        <p className="subSlogan">帮助你1:1精准匹配</p>
        <Search
          className="phoneNumberInput"
          placeholder="你的中国大陆手机号"
          enterButton="开始"
          size="large"
          color="blue"
          onSearch={onSubmitPhoneNumber}
        />
        <p className="memberTip">
          已经是Genial会员？
          <a href="/login">点击登录</a>
          {/* <Button>
            点击登陆
          </Button> */}
        </p>
      </div>
    )
  }
}

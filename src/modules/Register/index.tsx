/* eslint-disable no-restricted-globals */
import React from 'react'
import { Row, Col, Input, Steps, Button, message } from 'antd'
import {
  MessageOutlined,
  UserOutlined,
  HighlightOutlined,
  CoffeeOutlined
} from '@ant-design/icons'
import { observer } from 'mobx-react'
import { makeObservable, observable, action, computed } from 'mobx'
import Objectives from './Objectives'
import DescBlock from './DescBlock'
import { IUserStatus } from './model'
import {
  checkVerificationCode,
  getUserStatus,
  IVerificationCodeData,
  loginAfterRegister,
  register
} from './apis'

import './style.css'

const { Step } = Steps

export interface IRegisterProps {}

@observer
export default class Register extends React.Component<IRegisterProps, any> {
  /**
   * 0: 短信验证码
   * 1: 姓名
   */
  currentStep: number = 0
  verifyCode: string = ''
  userName: string = ''
  userId: string = ''
  objectives: string[] = []
  userStatus?: IUserStatus
  phoneNumber: string = ''

  increCurrentStep() {
    this.currentStep++
  }

  decreCurrentStep() {
    this.currentStep--
  }

  setVerifyCode(code: string) {
    this.verifyCode = code
  }

  setUserName(name: string) {
    this.userName = name
  }

  setPhoneNumber(number: string) {
    this.phoneNumber = number
  }

  setUserStatus(data: IUserStatus) {
    this.userStatus = data
  }

  getUserId() {
    if(this.userStatus) {
      const { id } = this.userStatus
      return id ? id : undefined
    }
    return undefined
  }

  async checkVerificationCode(data: IVerificationCodeData) {
    const res = await checkVerificationCode(data)
    if (res.code === 200) {
      this.getUserStatus(this.phoneNumber)
      this.increCurrentStep()
    } else {
      message.info('请输入正确的验证码·')
    }
  }

  async getUserStatus(phone: string) {
    const res = await getUserStatus(phone)
    const { data } = res
    this.setUserStatus(data as IUserStatus)
  }

  handleSubmitVC() {
    const phone = sessionStorage.getItem('phoneNumber')
    const code = this.verifyCode
    if (phone) {
      this.checkVerificationCode({ phone, code })
    }
  }

  async handleSubmitName() {
    const userName = this.userName
    if (!userName.length) {
      message.info('你的名字不能为空!')
    } else {
      sessionStorage.setItem('userName', this.userName)
      // 发送提交用户姓名的请求
      const id = this.getUserId()
      if(id) {
        sessionStorage.setItem('id', id)
        const params = {
          id,
          userName
        }
        const res = await register(params)
        console.log("register res:", res)
        if(res.data.status === 1) {   // 用户正在注册流程中
          this.increCurrentStep()
        }
      }else{
        message.info('出错了，请尝试重新注册')
      }
    }
  }

  async handleGetStarted() {
    // 组装参数
    // const phoneNumber = sessionStorage.getItem('phoneNumber')
    // const userName = this.userName
    const res = await loginAfterRegister(this.phoneNumber)

    console.log("loginres:", res)

    // location.pathname = '/weekly'
  }

  redirectToStartPage() {
    location.pathname = '/'
  }

  get subTitle() {
    return this.currentStep < 2
      ? '准备开始!'
      : this.currentStep < 3
      ? '告诉我们更多...'
      : ''
  }

  get inputContent() {
    const isVCStage = this.currentStep === 0
    const isNameStage = this.currentStep === 1
    return (
      <div className="infoInputContainer">
        <Row>
          <Col span={6} offset={9}>
            {isVCStage && (
              <Input
                type="primary"
                size="large"
                placeholder="输入验证码"
                onChange={(e: any) => this.setVerifyCode(e.target.value)}
              />
            )}
            {isNameStage && (
              <Input
                type="primary"
                size="large"
                placeholder="输入你的名字"
                onChange={(e: any) => this.setUserName(e.target.value)}
              />
            )}
            <Button
              className="submitVCButton"
              type="primary"
              size="large"
              onClick={() => {
                isVCStage ? this.handleSubmitVC() : this.handleSubmitName()
              }}
            >
              {isVCStage ? '提交验证码' : '下一步'}
            </Button>
          </Col>
        </Row>
      </div>
    )
  }

  constructor(props: IRegisterProps) {
    super(props)
    this.increCurrentStep = this.increCurrentStep.bind(this)
    this.decreCurrentStep = this.decreCurrentStep.bind(this)
    makeObservable(this, {
      currentStep: observable,
      userName: observable,
      userStatus: observable,
      phoneNumber: observable,
      objectives: observable.ref,
      inputContent: computed,
      increCurrentStep: action,
      decreCurrentStep: action,
      setVerifyCode: action,
      setUserName: action,
      setPhoneNumber: action,
      setUserStatus: action
    })
  }

  componentDidMount() {
    const phone = sessionStorage.getItem('phoneNumber')
    if (phone) {
      message.info('我们已经向您的手机发送了一条带有验证码的短信')
      this.setPhoneNumber(phone)
      // sessionStorage.removeItem('phoneNumber')
    }
  }

  render() {
    return (
      <div className="registerContainer">
        <p
          className="registerTitle"
          onClick={() => {
            this.redirectToStartPage()
          }}
        >
          Genial
        </p>
        <p className="registerSubTitle">{this.subTitle}</p>
        {/* <img src={cityCover} alt=''></img> */}
        <Steps current={this.currentStep}>
          <Step title="查收短信验证码" icon={<MessageOutlined />} />
          <Step title="完善基本信息" icon={<UserOutlined />} />
          <Step title="做一些自我介绍" icon={<HighlightOutlined />} />
          <Step title="一切就绪" icon={<CoffeeOutlined />} />
        </Steps>
        {this.currentStep < 2 && <>{this.inputContent}</>}
        {this.currentStep === 2 && (
          <div className="selfInfoContainer">
            <Objectives
              increCurrentStep={this.increCurrentStep}
              decreCurrentStep={this.decreCurrentStep}
            />
          </div>
        )}
        {this.currentStep === 3 && (
          <div className="readyContentContainer">
            <p className="readyTitle">我们如何运作?</p>
            <DescBlock />
            <Button
              type="primary"
              onClick={() => {
                this.handleGetStarted()
              }}
              className="startButton"
            >
              现在开始!
            </Button>
          </div>
        )}
      </div>
    )
  }
}

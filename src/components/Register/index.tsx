import React from 'react'
import { Row, Col, Input, Steps, Button, message } from 'antd'
// import { MessageOutlined, UserOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react'
import { makeObservable, observable, action } from 'mobx'

// import cityCover from '../../static/cities-graphic.svg'

import './style.css'

const { Step } = Steps

export interface IRegisterProps {

}

export interface IUserProfile {
  userName: string
  objectives: string[]
  interests: string[]
}

@observer
export default class Register extends React.Component<IRegisterProps, any> {
  /**
   * 0: 短信验证码
   * 1: 姓名
   * 2: 目标
   */
  currentStep: number = 0
  verifyCode: string = ''
  userName: string = ''
  userProfile?: IUserProfile

  increCurrentStep() {
    this.currentStep ++
  }

  setVerifyCode(code: string) {
    this.verifyCode = code
  }

  setUserName(name: string) {
    this.userName = name
  }

  handleSubmitVC() {
    console.log("vrCode:", this.verifyCode)

    // post request and verify in if
    if(true) {
      this.increCurrentStep()

    } else {
      message.info('请输入正确的验证码')
    }
  }

  handleSubmitName() {
    console.log("name, vrode:", this.userName, this.verifyCode)
    setTimeout(() => this.increCurrentStep(),200)
  }

  get inputContent() {
    const isVCStage =  (this.currentStep === 0)
    const isNameStage = ( this.currentStep === 1)
    return (
      <div className='infoInputContainer'>
        <Row>
          <Col span={6} offset={9}>
            {isVCStage && 
            <Input 
              type='primary'
              size='large'
              placeholder='输入验证码'
              onChange={(e: any) => this.setVerifyCode(e.target.value)}
            />}
            {isNameStage &&
            <Input 
              type='primary'
              size='large'
              placeholder='输入你的名字'
              onChange={(e:any) => this.setUserName(e.target.value)}
            />
            }
            <Button
              className='submitVCButton'
              type='primary'
              size='large'
              onClick={() => {
                isVCStage ?
                this.handleSubmitVC() :
                this.handleSubmitName()
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
    makeObservable(this, {
      currentStep: observable,
      userName: observable,
      userProfile: observable,
      increCurrentStep: action,
      setVerifyCode: action,
      setUserName: action
    })
  }
  
  componentDidMount() {
    message.info('我们已经向您的手机发送了一条带有验证码的短信')
  }

  render() {
    return (
      <div className='registerContainer'>
        <p className='registerTitle'>Genial</p>
        <p className='registerSubTitle'>准备开始!</p>
        {/* <img src={cityCover} alt=''></img> */}
        <Steps progressDot current={this.currentStep}>
          <Step title="查收短信验证码" />
          <Step title="完善基本信息" />
          <Step title="做一些自我介绍" />
          <Step title="Waiting" />
        </Steps>
        {(this.currentStep < 2) &&
          <>
            {this.inputContent}
          </>}
      </div>
    )
  }
}
import React from 'react'
import { Button, message } from 'antd'
import { observer } from 'mobx-react'
import { action, makeObservable, observable } from 'mobx'
import SampleIntros from './SampleIntros'

import './style.less'
import { register } from '../apis'

export interface ISelfIntroProps {
  increCurrentStep: () => void
  returnPreviousStep: () => void
}

@observer
export default class SelfIntroduction extends React.Component<
  ISelfIntroProps,
  any
> {
  selfIntroduction: string = ''

  setSelfIntroduction(value: string) {
    this.selfIntroduction = value
  }

  handleTextAreaOnChange(value: string) {
    this.setSelfIntroduction(value)
  }

  async handleSubmitIntro() {
    sessionStorage.setItem('introduction', this.selfIntroduction)
    const id = sessionStorage.getItem('id')
    const goalIds = sessionStorage.getItem('goalIds')!
    const interest = sessionStorage.getItem('interest')!
    const interestIds = sessionStorage.getItem('interestIds')!
    const userName = sessionStorage.getItem('userName')!
    const introduction = this.selfIntroduction
    if(id) {
      const res = await register({
        id, introduction, interest, goalIds, interestIds, userName
      })
      const status = res.data.status
      if(status === 2){
        const { increCurrentStep } = this.props
        increCurrentStep()
      }else if(status === 5){
        message.info('注册失败，请尝试重新注册')
      }
    }

  }

  returnPreviousStep() {
    const { returnPreviousStep } = this.props
    returnPreviousStep()
  }

  constructor(props: ISelfIntroProps) {
    super(props)
    makeObservable(this, {
      selfIntroduction: observable,
      setSelfIntroduction: action
    })
  }

  render() {
    const userName = sessionStorage.getItem('userName')
    return (
      <div className="selfIntroContainer">
        <p className="selfIntroHeader">你想怎么样描述你自己?</p>
        <p className="selfIntroExp">
          告诉我们任何你想要和你的匹配对象分享的话。
        </p>
        <textarea
          defaultValue={`${userName}是`}
          id="intro"
          className="introTextArea"
          onChange={(e: any) => this.handleTextAreaOnChange(e.target.value)}
        />
        <SampleIntros />

        <Button
          className="introButton"
          type="primary"
          onClick={() => {
            this.returnPreviousStep()
          }}
        >
          上一步
        </Button>

        <Button
          className="introButton"
          type="primary"
          onClick={() => {
            this.handleSubmitIntro()
          }}
        >
          下一步
        </Button>
      </div>
    )
  }
}

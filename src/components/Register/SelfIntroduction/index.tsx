import React from 'react'
import { observer } from 'mobx-react'
import { action, makeObservable, observable } from 'mobx'
import SampleIntros from './SampleIntros'


import './style.less'
import { Button } from 'antd'

export interface ISelfIntroProps {
  increCurrentStep: () => void
}

@observer
export default class SelfIntroduction extends React.Component<ISelfIntroProps,any> {

  selfIntroduction: string = ''
  
  setSelfIntroduction(value: string) {
    this.selfIntroduction = value
  }

  handleTextAreaOnChange(value: string) {
    this.setSelfIntroduction(value)
  }

  onSubmitIntro() {
    const { increCurrentStep } = this.props
    sessionStorage.setItem('selfIntroduction',this.selfIntroduction)
    increCurrentStep()
  }

  constructor(props: ISelfIntroProps) {
    super(props)
    makeObservable(this,{
      selfIntroduction: observable,
      setSelfIntroduction: action,
    })
  }

  render() {
    const userName = sessionStorage.getItem('name')
    return (
      <div className='selfIntroContainer'>
        <p className='selfIntroHeader'>你想怎么样描述你自己?</p>
        <p className='selfIntroExp'>告诉我们任何你想要和你的匹配对象分享的话。</p>
        <textarea
          defaultValue={`${userName}是`}
          id='intro'
          className='introTextArea'
          onChange={(e: any) => this.handleTextAreaOnChange(e.target.value)}
        />
        <SampleIntros />
        <Button
          type='primary'
          size='large'
          onClick={() => {this.onSubmitIntro()}}
        >
          下一步
        </Button>
      </div>
    )
  }
}
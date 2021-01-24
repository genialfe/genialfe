import React from 'react'
import { Input, Button, message } from 'antd'
import { observer } from 'mobx-react'
import { action, makeObservable, observable } from 'mobx'

import './style.less'

const { TextArea } = Input

export interface IFeedbackProps {}

@observer
export default class Feedback extends React.Component<IFeedbackProps, any> {

  feedback: string = ''

  setFeedback(value: string) {
    this.feedback = value
  }

  handleFeedbackChange(feedback:string) {
    this.setFeedback(feedback)
  }

  handleSubmitFeedback() {
    if(this.feedback.length) {
      message.info('感谢你的反馈')
      this.setFeedback('')
    }
  }

  constructor(props: IFeedbackProps) {
    super(props)
    makeObservable(this, {
      feedback: observable,
      setFeedback: action
    })
  }

  render() {
    return (
      <div className="feedbackContainer">
        你可以给我们
        <a href="mailto:simonmmm@126.com?cc=zhouhoushu@126.com" rel="nofollow" className='mailLink'>
          发送邮件
        </a>
        ，或者直接在下面创建你的反馈。

        <TextArea
          rows={4} 
          className='feedbackTextarea'  
          placeholder='输入你的反馈...'
          value={this.feedback}
          onChange={(e: any) => this.handleFeedbackChange(e.target.value)}
          showCount
          
        />
        <Button
          onClick={() => this.handleSubmitFeedback()}
        >
          提交反馈
        </Button>
      </div>
    )
  }
}

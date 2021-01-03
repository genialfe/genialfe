import React from 'react'
import { action, makeObservable, observable } from 'mobx'
import { Button } from 'antd'
import { observer } from 'mobx-react'
import InterestsTagBox from './InterestsTagBox'
import { business, sciTech, social } from './constants'

import './style.css'

export interface IInterestsProps {
  onStepChange: () => void
}

@observer
export default class Interests extends React.Component<IInterestsProps, any> {

  interests: string[] = []

  // stateArray为01数组 对应constants中引入的business/sciTech/social中每一项的状态
  stateArrayToList(category: string) {
    const stateArray: string[] = JSON.parse(sessionStorage.getItem(category)!)
    switch(category) {
      case 'business':
        for(let i=0; i<stateArray.length; i++) {
          if(stateArray[i]){
            this.interests.push(business[i].name)
          }
        }
        break
      case 'sciTech':
        for(let i=0; i<stateArray.length; i++) {
          if(stateArray[i]){
            this.interests.push(sciTech[i].name)
          }
        }
        break
      case 'social':
        for(let i=0; i<stateArray.length; i++) {
          if(stateArray[i]){
            this.interests.push(social[i].name)
          }
        }
        break
    }
  }

  setInterests(interests: string[]) {
    this.interests = interests
  }

  submitInterests() {
    this.setInterests([])
    this.stateArrayToList('business')
    this.stateArrayToList('sciTech')
    this.stateArrayToList('social')
    sessionStorage.setItem('interests', JSON.stringify(this.interests))

    const { onStepChange } = this.props
    onStepChange()
  }

  constructor(props: IInterestsProps) {
    super(props)
    makeObservable(this,{
      interests: observable,
      setInterests: action
    })
  }

  render() {
    return (
      <div className='interestsContainer'>
        <p className='interestsTitle'>你对什么感兴趣?</p>
        <p className='interestsExp'>从下面的列表中选择。</p>
        <InterestsTagBox
          category='business'
          title='商业'
          items={business}
        />
        <InterestsTagBox 
          category='sciTech'
          title='科学与技术'
          items={sciTech}
        />
        <InterestsTagBox 
          category='social'
          title='社会活动'
          items={social}
        />
        <Button
          className='objButton'
          type='primary'
          onClick={() => {this.submitInterests()}}       
        >
          下一步
        </Button>
      </div>
    )
  }
}

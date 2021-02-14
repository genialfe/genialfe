import React from 'react'
import { action, makeObservable, observable } from 'mobx'
import { Button, message } from 'antd'
import { observer } from 'mobx-react'
import InterestsTagBox from './InterestsTagBox'
import { business, sciTech, social } from './constants'
import { getInterestsList, register } from '../apis'

import './style.less'

export interface IInterestsProps {
  /**
   * 推进步骤 回调函数
   */
  increStep: () => void
  /**
   * 返回上一个步骤
   */
  returnPreviousStep: () => void
}

export interface IInterest {
  // api拉取的兴趣列表
  id: string
  interest: string
}

@observer
export default class Interests extends React.Component<IInterestsProps, any> {
  interests: string[] = []
  interestIds: string[] = []

  business: IInterest[] = []
  sciTech: IInterest[] = []
  social: IInterest[] = []

  // stateArray为01数组 对应constants中引入的business/sciTech/social中每一项的状态
  stateArrayToList(category: string) {
    const stateArray: string[] = JSON.parse(sessionStorage.getItem(category)!)
    switch (category) {
      case 'business':
        for (let i = 0; i < stateArray.length; i++) {
          if (stateArray[i]) {
            // in order to match the api, simply change .name into .id
            this.interests.push(this.business[i].interest)
            this.interestIds.push(this.business[i].id)
          }
        }
        break
      case 'sciTech':
        for (let i = 0; i < stateArray.length; i++) {
          if (stateArray[i]) {
            this.interests.push(this.sciTech[i].interest)
            this.interestIds.push(this.sciTech[i].id)
          }
        }
        break
      case 'social':
        for (let i = 0; i < stateArray.length; i++) {
          if (stateArray[i]) {
            this.interests.push(this.social[i].interest)
            this.interestIds.push(this.social[i].id)
          }
        }
        break
    }
  }

  setInterests(interests: string[]) {
    this.interests = interests
  }

  async submitInterests() {
    this.setInterests([])
    this.stateArrayToList('business')
    this.stateArrayToList('sciTech')
    this.stateArrayToList('social')

    if (!this.interests.length) {
      message.info('请至少选择一项')
      return
    }

    const interest = this.interests.join()
    const interestIds = this.interestIds.join()
    sessionStorage.setItem('interest', interest)
    sessionStorage.setItem('interestIds', interestIds)

    const params = {
      interest,
      interestIds,
      id: sessionStorage.getItem('id')!
    }
    const res = await register(params)
    if (res.data.status === 1) {
      const { increStep } = this.props
      increStep()
    }
  }

  returnPreviousStep() {
    const { returnPreviousStep } = this.props
    returnPreviousStep()
  }

  async setInterestsList() {
    const list = await getInterestsList()
    const { data } = list
    this.business = data[0].list
    this.sciTech = data[1].list
    this.social = data[2].list
  }

  componentDidMount() {
    this.setInterestsList()
  }

  constructor(props: IInterestsProps) {
    super(props)
    makeObservable(this, {
      sciTech: observable,
      social: observable,
      business: observable,
      setInterests: action
    })
  }

  render() {
    return (
      <div className="interestsContainer">
        <p className="interestsTitle">你对什么感兴趣?</p>
        <p className="interestsExp">从下面的列表中选择。</p>
        <InterestsTagBox category="business" title="商业" items={business} />
        <InterestsTagBox
          category="sciTech"
          title="科学与技术"
          items={sciTech}
        />
        <InterestsTagBox category="social" title="社会活动" items={social} />
        <Button
          className="objButton"
          type="primary"
          onClick={() => {
            this.returnPreviousStep()
          }}
        >
          上一步
        </Button>
        <Button
          className="objButton"
          type="primary"
          onClick={() => {
            this.submitInterests()
          }}
        >
          下一步
        </Button>
      </div>
    )
  }
}

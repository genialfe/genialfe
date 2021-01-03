import React from 'react'
import { observer } from 'mobx-react'
import { action, computed, makeObservable, observable } from 'mobx'
import { IInterestsTag } from '../../model'

import './style.less'

export interface IInterestsTagBoxProps {
  /**
   * 当前兴趣box的分类
   */
  category: string
  /**
   * 兴趣的tagbox的标题
   */
  title: string
  /**
   * 兴趣items
   */
  items: IInterestsTag[]
  /**
   * 向上层组件传递interests的方法
   */
  setInterests?: (category: string, interests: string[]) => void
}

@observer
export default class InterestsTagBox extends React.Component<IInterestsTagBoxProps, any> {
  selectedTags: string[] = []
  stateMap: number[] = []

  switchTagSelected(index: number) {
    const currentState = this.stateMap[index]
    this.stateMap[index] = currentState ? 0 : 1

    // 每次点击后把当前stateMap存入sessionStorage 外层通过stateMap获取用户选择的tag
    this.storeMap()
  }

  // stateMap记录每个tag是否被点击过 0没被点击过 1点击过
  setInitStateMap(length: number) {
    this.stateMap = new Array(length).fill(0)
    this.storeMap()
  }

  // 往sessionStorage中储存状态表
  storeMap() {
    const { category } = this.props
    sessionStorage.setItem(category, JSON.stringify(this.stateMap))
  }
 
  get tagBox() {
    const { items } = this.props
    return (
      items.map((item, index) => {
        return (
          <div 
            className={this.stateMap[index] ? 'tagSelected' : 'tag'}
            onClick={() => {
              this.switchTagSelected(index)
            }}
            key={index}
          >
            {item.desc}
          </div>
        )
      }) 
    )
  }

  componentDidMount() {
    const { items } = this.props
    this.setInitStateMap(items.length)
  }

  constructor(props: IInterestsTagBoxProps) {
    super(props)
    makeObservable(this,{
      selectedTags: observable,
      stateMap: observable,
      switchTagSelected: action,
      setInitStateMap: action,
      tagBox: computed
    }) 
  } 
  
  render() {
    const { title } = this.props
    return (
      <div className='tagBoxContainer'>
        <p className='interestsTagBoxTitle'>{title}</p>
        {this.tagBox}
      </div>
    )
  }
}

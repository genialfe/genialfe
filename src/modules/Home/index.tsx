import React from 'react'
import { observer } from 'mobx-react'
import { observable, action, makeObservable } from 'mobx'
import Usercardlist from './UsercardList'

import './style.less'

export interface IHomeProps {}

export enum EHomeItemType {
  Explore = 'explore',
  Connection = 'connection'
}

@observer
export default class Home extends React.Component<IHomeProps, any> {
  selectedItem: EHomeItemType = EHomeItemType.Explore

  setSelectedItem(value: EHomeItemType) {
    this.selectedItem = value
  }

  getButtonClassName(type: EHomeItemType) {
    if (type === this.selectedItem) {
      return 'sideButtonSelected'
    } else {
      return 'sideButton'
    }
  }

  constructor(props: IHomeProps) {
    super(props)
    makeObservable(this, {
      selectedItem: observable,
      setSelectedItem: action
    })
  }

  render() {
    const isMobileScreen = window.matchMedia('(max-width:500px)').matches
    return (
      <div className="homeContainer">
        <div className='row'>
          <div className='col-sidebar'>
            <div className="sideBarContainer">
              <div
                className={this.getButtonClassName(EHomeItemType.Explore)}
                onClick={() => this.setSelectedItem(EHomeItemType.Explore)}
              >
                发现
              </div>
              <div
                className={this.getButtonClassName(EHomeItemType.Connection)}
                onClick={() => this.setSelectedItem(EHomeItemType.Connection)}
              >
                联系
              </div>
            </div>
          </div>
          {
            isMobileScreen &&
            <div className='mobileNavbar'>
              <div
                className={this.getButtonClassName(EHomeItemType.Explore)}
                onClick={() => this.setSelectedItem(EHomeItemType.Explore)}
              >
                发现
              </div>
              <div
                className={this.getButtonClassName(EHomeItemType.Connection)}
                onClick={() => this.setSelectedItem(EHomeItemType.Connection)}
              >
                联系
              </div>
            </div>
          }
          <div className={isMobileScreen ? '' : 'col-content'}>
            <div className="userListContainer">
              <Usercardlist type={this.selectedItem} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

/* eslint-disable no-restricted-globals */
import React from 'react'
import { observer } from 'mobx-react'
import { observable, action, makeObservable } from 'mobx'
import { message } from 'antd'
import Usercardlist, { IUserData } from './UsercardList'
import { getAvailableTimes } from '../Meetings/api'
import { getMatchedUserlist, getRecommendUserlist } from './api'

import './style.less'

export interface IHomeProps {}

export enum EHomeItemType {
  Explore = 'explore',
  Connection = 'connection'
}

@observer
export default class Home extends React.Component<IHomeProps, any> {
  selectedItem: EHomeItemType = EHomeItemType.Explore
  userlist: IUserData[] = []

  setSelectedItem(value: EHomeItemType) {
    this.selectedItem = value
    this.getHomeUserlist(value)
  }

  setUserlist(userlist: IUserData[]) {
    this.userlist = userlist
  }

  getButtonClassName(type: EHomeItemType) {
    return type === this.selectedItem ? 'sideButtonSelected' : 'sideButton'
  }

  async checkMeetingReserved() {
    const res = await getAvailableTimes()
    if (!res.data.length) {
      // 还没预约过会议
      message.info('请先选择下周空闲的时间段')
      location.pathname = 'weekly'
    }
  }

  async getHomeUserlist(type: EHomeItemType) {
    let userlist = []
    if (type === EHomeItemType.Connection) {
      const connectionRes = await getMatchedUserlist()
      console.log('connectionRes:', connectionRes)
      userlist = connectionRes.data
    } else if (type === EHomeItemType.Explore) {
      const exploreRes = await getRecommendUserlist()
      console.log('exploreRes:', exploreRes)
      userlist = exploreRes.data
    }

    this.setUserlist(userlist as IUserData[])
  }

  componentDidMount() {
    this.getHomeUserlist(this.selectedItem)
  }

  constructor(props: IHomeProps) {
    super(props)
    makeObservable(this, {
      selectedItem: observable,
      userlist: observable.ref,
      setSelectedItem: action,
      setUserlist: action
    })

    // 查看用户是否选择过下一周的空闲时间段
    this.checkMeetingReserved()
  }

  render() {
    const isMobileScreen = window.matchMedia('(max-width:500px)').matches
    return (
      <div className="homeContainer">
        <div className="row">
          <div className="col-sidebar">
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
          {isMobileScreen && (
            <div className="mobileNavbar">
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
          )}
          <div
            className={isMobileScreen ? 'mobile-col-content' : 'col-content'}
          >
            <div className="userListContainer">
              <Usercardlist type={this.selectedItem} userlist={this.userlist} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

/* eslint-disable no-restricted-globals */
import React from 'react'
import { observer } from 'mobx-react'
import { observable, action, makeObservable } from 'mobx'
import { Spin } from 'antd'
import Usercardlist, { IUserData } from './UsercardList'
import { getReservedTimesAndMatchStatus } from '../Meetings/api'
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
  isLoading: boolean = true

  setSelectedItem(value: EHomeItemType) {
    this.selectedItem = value
    this.getHomeUserlist(value)
  }

  setUserlist(userlist: IUserData[]) {
    this.userlist = userlist
  }

  setIsLoading(value: boolean) {
    this.isLoading = value
  }

  getButtonClassName(type: EHomeItemType) {
    return type === this.selectedItem ? 'sideButtonSelected' : 'sideButton'
  }

  // 判断用户这周是否选择过时间段
  async checkTimesReserved() {
    let hasSkipped = false

    const res = await getReservedTimesAndMatchStatus()
    const { data } = res
    if (data) {
      // 判断该用户是否跳转
      const { status } = data
      if (status === 4) {
        hasSkipped = true
      }

      // 用户没选择过时间 即data.list为null 并且没跳过这周 则需要跳转
      if (!hasSkipped && !data.list) {
        sessionStorage.setItem('need_time_selection', '1')
        location.pathname = 'weekly'
      }
    }
  }

  // 获取首页展示用户列表
  async getHomeUserlist(type: EHomeItemType) {
    if (type === EHomeItemType.Explore) {
      const matchRes = await getMatchedUserlist()
      if (matchRes.code === 401) {
        location.pathname = '/'
      } else {
        const matchUserlist = matchRes.data ? matchRes.data : []
        const recommendRes = await getRecommendUserlist()
        const recommendUserlist = recommendRes.data ? recommendRes.data : []
        this.setUserlist([...recommendUserlist, ...matchUserlist])
        this.setIsLoading(false)
      }
    } else {
      this.setUserlist([])
    }
  }

  componentDidMount() {
    this.getHomeUserlist(this.selectedItem)
  }

  constructor(props: IHomeProps) {
    super(props)
    makeObservable(this, {
      selectedItem: observable,
      userlist: observable.ref,
      isLoading: observable,
      setSelectedItem: action,
      setUserlist: action,
      setIsLoading: action
    })

    // 查看用户是否选择过下一周的空闲时间段
    this.checkTimesReserved()
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
              {this.isLoading && <Spin style={{ marginLeft: '50%' }} />}
              <Usercardlist type={this.selectedItem} userlist={this.userlist} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

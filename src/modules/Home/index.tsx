import React from 'react'
import { Row, Col } from 'antd'
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
    return (
      <div className="homeContainer">
        <Row>
          <Col span={2} offset={6}>
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
          </Col>
          <Col span={8}>
            <div className="userListContainer">
              <Usercardlist type={this.selectedItem} />
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

import React from 'react'
import { Row, Col } from 'antd'
import { observer } from 'mobx-react'
import { makeObservable, observable, action } from 'mobx'
import Feedback from './Feedback'
import QA from './QA'

import './style.less'

export interface ISettingsProps {}

export enum EMoreItemType {
  Settings = 'settings',
  QA = 'qa',
  Feedback = 'feedback'
}

@observer
export default class Settings extends React.Component<ISettingsProps, any> {
  selectedItem: EMoreItemType = EMoreItemType.QA

  setSelectedItem(item: EMoreItemType) {
    this.selectedItem = item
  }

  getButtonClassName(type: EMoreItemType) {
    if (type === this.selectedItem) {
      return 'sideButtonSelected'
    } else {
      return 'sideButton'
    }
  }

  get content() {
    return this.selectedItem === EMoreItemType.Feedback ? <Feedback /> : <QA />
  }

  constructor(props: ISettingsProps) {
    super(props)
    makeObservable(this, {
      selectedItem: observable,
      setSelectedItem: action
    })
  }

  render() {
    return (
      <div className="settingsContainer">
        <Row>
          <Col span={2} offset={4}>
            <div className="sideBarContainer">
              <div
                className={this.getButtonClassName(EMoreItemType.QA)}
                onClick={() => this.setSelectedItem(EMoreItemType.QA)}
              >
                帮助
              </div>
              <div
                className={this.getButtonClassName(EMoreItemType.Feedback)}
                onClick={() => this.setSelectedItem(EMoreItemType.Feedback)}
              >
                反馈
              </div>
              {/* <div 
              className={this.getButtonClassName(EMoreItemType.Settings)}
              onClick={() => this.setSelectedItem(EMoreItemType.Settings)}
            >
              设置
            </div> */}
            </div>
          </Col>
          <Col span={12}>
            <div className="settingsContentContainer">{this.content}</div>
          </Col>
        </Row>
      </div>
    )
  }
}

import React from 'react'
import { observer } from 'mobx-react'
import { makeObservable, observable, action } from 'mobx'
import Feedback from './Feedback'
import QA from './QA'

import './style.less'

export interface ISettingsProps {}

export enum EMoreItemType {
  Settings = 'settings',
  QA = 'qa',
  Feedback = 'feedback',
  Mailbox = 'mailbox'
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
    const isMobileScreen = window.matchMedia('(max-width:500px)').matches
    return (
      <div className="settingsContainer">
        <div className='row'>
          <div className='col-sidebar-settings'>
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
            </div>
          </div>
          {isMobileScreen && (
            <div className="mobileNavbar">
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
            </div>
          )}
          <div className='col-content-settings'>
            <div className="settingsContentContainer">{this.content}</div>
          </div>
        </div>
      </div>
    )
  }
}

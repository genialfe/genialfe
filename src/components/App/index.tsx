import React from 'react'
import { action, observable } from 'mobx'
import { observer } from 'mobx-react'
import { Button, Switch } from 'antd'
import bind from '../../utils/bind'

import './style.css'
import Profile from '../Profile'

export interface IAppProps {

}

@observer
export default class App extends React.Component<IAppProps, any> {

  @observable isTestMode: boolean = false

  @bind
  @action
  setIsTestMode(value: boolean) {
    this.isTestMode = value
  }

  @bind
  handleSwitchChange(checked: boolean) {
    this.setIsTestMode(checked)
  }

  render() {
    return (
      <div className='App'>
        <div className='TestModeSwitch'>
          测试模式 {this.isTestMode ? 'true' : 'false'}
          <Switch 
            checkedChildren='开启'
            unCheckedChildren='关闭'
            onChange={this.handleSwitchChange}
          />
        </div>
        {
          <Profile 
            name='马斯克' 
            location='上海' 
            introduction='测试' 
            interests={['天使投资', '数据挖掘']}
            connections={0}
          />
        }
        {
          this.isTestMode && (
            <div>
              <Button>TEST ANTD BUTTON</Button>
            </div>
          )
        }
      </div>
    )
  }
}


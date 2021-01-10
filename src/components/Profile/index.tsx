import React from 'react'
import { Card, Dropdown, Menu } from 'antd'
import { MenuUnfoldOutlined } from '@ant-design/icons'
import { observable, action, makeObservable } from 'mobx'
import { observer } from 'mobx-react'
import UserAvatar from './UserAvatar'
import UserIntroduction from './UserIntroduction'
import UserInterests from './UserInterests'

import './style.less'
import ConnectionBar from './ConnectionBar'

export interface IProfileProps {
  name?: string
  location?: string
  selfIntroduction?: string
  interests?: string[]
  connections?: number
}

@observer
export default class Profile extends React.Component<IProfileProps, any> {

  isEditMode: boolean = false

  setEditMode(value: boolean) {
    this.isEditMode = value
  }

  onClickOperation(e: any) {
    if(e.key === 'logout') {
      // eslint-disable-next-line no-restricted-globals
      location.pathname = '/'
    }else if(e.key === 'edit') {
      this.setEditMode(true)
    }
  }

  get operationMenu() {
    return (
      <Menu onClick={(e) => this.onClickOperation(e)}>
        <Menu.Item key="edit">修改信息</Menu.Item>
        <Menu.Item key="logout">退出登录</Menu.Item>
      </Menu>
    )
  }

  constructor (props: IProfileProps) {
    super(props)
    makeObservable(this,{
      isEditMode: observable,
      setEditMode: action
    })
  }


  render() {
    const {
      selfIntroduction,
      interests,
      connections,
      ...restProps
    } = this.props
    return (
      <>
        <Card>
            <Dropdown
              overlay={this.operationMenu}
            >
              <MenuUnfoldOutlined />
            </Dropdown>
            <UserAvatar {...restProps} />
            <UserIntroduction content={selfIntroduction} />
            <UserInterests interests={interests} />
            <ConnectionBar connectionNum={connections} />
        </Card>
      </>
    )
  }
}

/* eslint-disable no-restricted-globals */
import React from 'react'
import { Card, Dropdown, Menu } from 'antd'
import { MenuUnfoldOutlined } from '@ant-design/icons'
import { observable, action, makeObservable } from 'mobx'
import { observer } from 'mobx-react'
import Cookies from 'universal-cookie'
import UserAvatar from './UserAvatar'
import UserIntroduction from './UserIntroduction'
import UserInterests from './UserInterests'
import ConnectionBar from './ConnectionBar'
import EditProfile from './EditProfile'

import './style.less'

const cookies = new Cookies()

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
    if (e.key === 'logout') {
      cookies.remove('token')
      location.pathname = '/'
    } else if (e.key === 'edit') {
      this.setEditMode(true)
    }
  }

  get operationMenu() {
    return (
      <Menu onClick={e => this.onClickOperation(e)}>
        <Menu.Item key="edit">修改信息</Menu.Item>
        <Menu.Item key="logout">退出登录</Menu.Item>
      </Menu>
    )
  }

  constructor(props: IProfileProps) {
    super(props)
    this.setEditMode = this.setEditMode.bind(this)
    makeObservable(this, {
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
          {!this.isEditMode && (
            <>
              <Dropdown overlay={this.operationMenu} trigger={['click']}>
                <MenuUnfoldOutlined />
              </Dropdown>
              <UserAvatar {...restProps} />
              <UserIntroduction content={selfIntroduction} />
              <UserInterests interests={interests} />
              <ConnectionBar connectionNum={connections} />
            </>
          )}
          {this.isEditMode && (
            <EditProfile onFinishEditting={this.setEditMode} />
          )}
        </Card>
      </>
    )
  }
}

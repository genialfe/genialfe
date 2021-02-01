/* eslint-disable no-restricted-globals */
import React from 'react'
import { Card, Dropdown, Menu, Tooltip } from 'antd'
import { MenuUnfoldOutlined } from '@ant-design/icons'
import { observable, action, makeObservable } from 'mobx'
import { observer } from 'mobx-react'
import Cookies from 'universal-cookie'
import UserAvatar from './UserAvatar'
import UserInterests from './UserInterests'
import ConnectionBar from './InvitationCodeBar'
import EditProfile from './EditProfile'

import './style.less'

const cookies = new Cookies()

// be careful there is wrapper file for profile component

export interface IProfileProps {
  /**
   * 头像url
   */
  headImg: string
  /**
   * 兴趣
   */
  interest: string
  /**
   * 用户自我介绍
   */
  introduction: string
  /**
   * 积分数
   */
  point: number
  /**
   * 用户姓名
   */
  userName: string
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
    const { userName, introduction, interest, headImg, point } = this.props
    console.log("headIMg:", headImg)
    const pointsTootip = <span>我的积分数</span>
    return (
      <>
        <Card>
          {!this.isEditMode && (
            <>
              <Dropdown overlay={this.operationMenu} trigger={['click']}>
                <MenuUnfoldOutlined />
              </Dropdown>
              <UserAvatar avatarUrl={headImg} />
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '16px', color: '#5b5b5b' }}>{userName}</p>
                <Tooltip
                  placement="right"
                  title={pointsTootip}
                  color="rgb(71, 168, 165)"
                >
                  <div className="pointsContainer">
                    <p className="pointsNumber">{point}</p>
                    <svg
                      width="10"
                      height="10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.65 5a4.65 4.65 0 11-9.3 0 4.65 4.65 0 019.3 0zM5 8.737a3.737 3.737 0 100-7.474 3.737 3.737 0 000 7.474z"
                        fill="#F79C51"
                        stroke="#F79C51"
                        stroke-width=".7"
                      ></path>
                      <circle cx="5" cy="5" r="2.25" fill="#F79C51"></circle>
                    </svg>
                  </div>
                </Tooltip>
              </div>
              <div className="introContainer">
                <p className="introTitle">简介</p>
                <p className="introContent">{introduction}</p>
              </div>
              <UserInterests interests={interest} />
              <ConnectionBar />
            </>
          )}
          {this.isEditMode && (
            <EditProfile onFinishEditting={this.setEditMode} {...this.props} />
          )}
        </Card>
      </>
    )
  }
}

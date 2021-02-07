/* eslint-disable no-restricted-globals */
import React from 'react'
import { Card, Dropdown, Menu, Tooltip, Modal } from 'antd'
import {
  MenuUnfoldOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'
import { observable, action, makeObservable } from 'mobx'
import { observer } from 'mobx-react'
import Cookies from 'universal-cookie'
import { getObjectivesList } from '../Register/apis'
import UserAvatar from './UserAvatar'
import UserInterests from './UserInterests'
import ConnectionBar from './InvitationCodeBar'
import EditProfile from './EditProfile'
import { deleteUser } from './api'

import './style.less'

const { confirm } = Modal
const cookies = new Cookies()

// be careful there is wrapper file for profile component

export interface IGoalIdMap {
  goal: string
  id: string
}

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
  goalIds: string
  interestIds: string
}

@observer
export default class Profile extends React.Component<IProfileProps, any> {
  isEditMode: boolean = false
  goalsDefaultValue: string[] = []

  setEditMode(value: boolean) {
    this.isEditMode = value
  }

  setGoalsDefaultValue(value: string[]) {
    this.goalsDefaultValue = value
  }

  onClickOperation(e: any) {
    if (e.key === 'logout') {
      cookies.remove('token')
      location.pathname = '/'
    } else if (e.key === 'edit') {
      this.setEditMode(true)
    } else if (e.key === 'delete') {
      this.handleDeleteAccount()
    }
  }

  handleDeleteAccount() {
    confirm({
      title: '确认要注销账号吗？',
      icon: <ExclamationCircleOutlined />,
      cancelText: '我再想想',
      okText: '确认注销',
      content:
        '注销账号的操作不可撤销，你的一切数据都会被永久删除。我们欢迎你在任何时候重新注册，但是你使用过的邀请链接将会失效。',
      async onOk() {
        const res = await deleteUser()
        if (res.code === 200) {
          cookies.remove('token')
          location.pathname = '/'
        }
      },
      onCancel() {}
    })
  }

  async getGoalsDefaultValue() {
    const { goalIds } = this.props
    const res = await getObjectivesList()
    if (res.data) {
      const goalIdMap: IGoalIdMap[] = res.data.map(
        (item: { id: string; goal: string }) => {
          return {
            id: item.id,
            goal: item.goal
          }
        }
      )
      const goalsDefaultValue = goalIds.split(',').map(goalId => {
        return goalIdMap.find(item => item.id === goalId)!.goal
      })
      this.setGoalsDefaultValue(goalsDefaultValue)
    }
  }

  get operationMenu() {
    return (
      <Menu onClick={e => this.onClickOperation(e)}>
        <Menu.Item key="edit">修改信息</Menu.Item>
        <Menu.Item key="logout">退出登录</Menu.Item>
        <Menu.Item key="delete" style={{ color: 'grey' }}>
          注销账号
        </Menu.Item>
      </Menu>
    )
  }

  componentDidMount() {
    // this.getGoalsDefaultValue()
  }

  constructor(props: IProfileProps) {
    super(props)
    this.setEditMode = this.setEditMode.bind(this)
    makeObservable(this, {
      isEditMode: observable,
      goalsDefaultValue: observable.ref,
      setEditMode: action,
      setGoalsDefaultValue: action
    })

    // this.setGoalsDefaultValue()
  }

  render() {
    const {
      userName,
      introduction,
      interest,
      headImg,
      point,
      interestIds,
      goalIds
    } = this.props
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
                <Tooltip placement="right" title={pointsTootip}>
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
              <UserInterests
                interests={interest}
                interestsIds={interestIds}
                goalIds={goalIds}
                // goalsDefaultValue={this.goalsDefaultValue}
              />
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

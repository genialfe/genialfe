import { Button, Divider, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { action, makeObservable, observable } from 'mobx'
import { observer } from 'mobx-react'
import React from 'react'
import { generateInvitationCode, getInvitationCode } from '../api'

import './style.less'

export interface IInvitationCodeBarProps {}

export interface IInvitationUrl {
  invitationUrl: string
  status: number
}

@observer
export default class InvitationCodeBar extends React.Component<
  IInvitationCodeBarProps,
  any
> {
  hasGeneratedInvitationCode: boolean = false
  invitationUrl: IInvitationUrl = { invitationUrl: '', status: -1 }

  setHasGeneratedInvitationCode(value: boolean) {
    this.hasGeneratedInvitationCode = value
  }

  setInvitationUrl(url: IInvitationUrl) {
    this.invitationUrl = url
  }

  async handleGenerateInvitationCode() {
    const res = await generateInvitationCode()
    const data = res.data
    if (data.invitationUrl) {
      const { status, invitationUrl } = data
      this.setInvitationUrl({
        status,
        invitationUrl
      })
      this.setHasGeneratedInvitationCode(true)
    }
  }

  async getInvitationCode() {
    const res = await getInvitationCode()
    const data = res.data
    if (data.invitationUrl) {
      const { status, invitationUrl } = data
      this.setInvitationUrl({
        status,
        invitationUrl
      })
      this.setHasGeneratedInvitationCode(true)
    }
  }

  get tootipContent() {
    return '将你的邀请链接复制粘贴给你的朋友,他能够通过访问这个链接来加入Genial.你最多能邀请20个朋友入驻.'
  }

  componentDidMount() {
    this.getInvitationCode()
  }

  constructor(props: IInvitationCodeBarProps) {
    super(props)
    makeObservable(this, {
      hasGeneratedInvitationCode: observable,
      invitationUrl: observable.ref,
      setHasGeneratedInvitationCode: action,
      setInvitationUrl: action
    })
  }

  render() {
    return (
      <div className="connectionContainer">
        <Divider />
        {this.hasGeneratedInvitationCode && (
          <div>
            <p className="connectionTitle">
              我的邀请链接
              <Tooltip title={this.tootipContent}>
                <QuestionCircleOutlined style={{ marginLeft: '4px' }} />
              </Tooltip>
            </p>
            <p className="connectionNum">{this.invitationUrl.invitationUrl}</p>
          </div>
        )}
        {!this.hasGeneratedInvitationCode && (
          <Button
            type="ghost"
            onClick={() => this.handleGenerateInvitationCode()}
          >
            生成我的邀请链接
          </Button>
        )}
      </div>
    )
  }
}

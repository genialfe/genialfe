import React from 'react'
import { Button, Row, Col, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { makeObservable, observable } from 'mobx'
import { observer } from 'mobx-react'

import './style.less'

export interface IEditProfileProps {
  onFinishEditting: (value: boolean) => void
}

@observer
export default class EditProfile extends React.Component<
  IEditProfileProps,
  any
> {
  loading: boolean = false
  imgUrl?: string
  userName: string = ''
  location: string = ''
  company: string = ''
  job: string = ''
  selfIntroduction: string = ''

  handleSubmitProfile() {
    // send request here

    const { onFinishEditting } = this.props
    // 结束编辑后 把是否在编辑模式 设置为false
    onFinishEditting(false)
  }

  handleCancelEdit() {
    const { onFinishEditting } = this.props
    // 结束编辑后 把是否在编辑模式 设置为false
    onFinishEditting(false)
  }

  constructor(props: IEditProfileProps) {
    super(props)
    makeObservable(this, {
      loading: observable,
      imgUrl: observable,
      userName: observable,
      location: observable,
      job: observable,
      company: observable,
      selfIntroduction: observable
    })
  }

  render() {
    return (
      <div className="editContainer">
        <div className="avatar">
          <Avatar size={64} icon={<UserOutlined />} />
        </div>
        <div className="formContainer">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <p className="inputTitle">姓名</p>
              <input className="input" />
            </Col>
            <Col span={12}>
              <p className="inputTitle">地区</p>
              <input className="input" />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <p className="inputTitle">公司</p>
              <input className="input" />
            </Col>
            <Col span={12}>
              <p className="inputTitle">职务</p>
              <input className="input" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <p className="inputTitle">自我介绍</p>
              <textarea className="textAreaInput" rows={6} />
            </Col>
          </Row>
        </div>

        <Button
          type="primary"
          onClick={() => this.handleCancelEdit()}
          className="button"
        >
          返回
        </Button>

        <Button
          type="primary"
          onClick={() => this.handleSubmitProfile()}
          className="button"
        >
          提交
        </Button>
      </div>
    )
  }
}

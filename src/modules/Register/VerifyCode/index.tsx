import React from 'react'
import { Row, Col, Input, Button } from 'antd'

import './style.css'

export interface IVerifyCodeProps {
  onHandleInputVC: (vc: string) => void
  onHandleSubmitVC: () => void
}

export default class VerifyCode extends React.Component<IVerifyCodeProps, any> {
  render() {
    const { onHandleInputVC, onHandleSubmitVC } = this.props
    return (
      <div className="vcInputContainer">
        <Row>
          <Col span={6} offset={9}>
            <Input
              type="primary"
              size="large"
              placeholder="输入验证码"
              onChange={(e: any) => {
                onHandleInputVC(e.target.value)
              }}
            />
            <Button
              className="submitVCButton"
              type="primary"
              size="large"
              onClick={() => {
                onHandleSubmitVC()
              }}
            >
              提交验证码
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

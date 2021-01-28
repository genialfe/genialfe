import React from 'react'
import { Col, Row } from 'antd'
import startPageCover from '../../static/startPageCover.svg'
import SignUp from './SignUp'
import Explain from './Explain'

import './style.less'

export interface IStartPageProps {}

export default class StartPage extends React.Component<IStartPageProps, any> {
  render() {
    const isMobileScreen = window.matchMedia('(max-width:500px)').matches
    return (
      <>
        <div className="logoHeader">
          <p className="logoTitle">Genial</p>
        </div>
        <div className="startPageRow" style={{ marginBottom: '11em' }}>
          <div className="col-12">
            <div className="signUpBlock">
              <SignUp />
            </div>
          </div>
          <div className="col-12">
            <img className="startPageCover" src={startPageCover} alt=""></img>
          </div>
        </div>

        {isMobileScreen && (
          <div className="mobileSignUpContainer">
            <SignUp />
            <img src={startPageCover} width={330} height={250} alt=""></img>
          </div>
        )}
        {!isMobileScreen && (
          <Row gutter={[0, 68]}>
            <Col span={24}>
              <Explain />
            </Col>
          </Row>
        )}
      </>
    )
  }
}

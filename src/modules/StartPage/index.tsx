/* eslint-disable no-restricted-globals */
import React from 'react'
import { Col, Row } from 'antd'
import { Redirect } from 'react-router-dom'
import { observer } from 'mobx-react'
import { action, makeObservable, observable } from 'mobx'
// import startPageCover from '../../static/startPageCover.svg'
import { getInvitationCode } from '../Profile/api'
import SignUp from './SignUp'
import Explain from './Explain'

import './style.less'

export interface IStartPageProps {}

@observer
export default class StartPage extends React.Component<IStartPageProps, any> {
  hasLoggedIn: boolean = false

  setHasLoggedIn(value: boolean) {
    this.hasLoggedIn = value
  }

  async checkHasLoggedIn() {
    const testApiRes = await getInvitationCode()
    if (testApiRes.code === 200) {
      this.setHasLoggedIn(true)
    }
  }

  constructor(props: IStartPageProps) {
    super(props)
    makeObservable(this, {
      hasLoggedIn: observable,
      setHasLoggedIn: action
    })
    this.checkHasLoggedIn()
  }

  render() {
    const isMobileScreen = window.matchMedia('(max-width:500px)').matches
    return this.hasLoggedIn ? (
      <Redirect to="/home" />
    ) : (
      <>
        <div className="logoHeader">
          <p className="logoTitle">Genial</p>
        </div>
        <div className="startPageRow" style={{ marginBottom: '16em' }}>
          <div className="col-12">
            <div className="signUpBlock">
              <SignUp />
            </div>
          </div>
          <div className="col-12">
            {/* <img className="startPageCover" src={startPageCover} alt=""></img> */}
            <img
              className="startPageCover"
              src="https://oss.genial.ltd/a8cfd/93f0ba99d661e14c66dc17be8c90c230.svg"
              alt=""
            ></img>
          </div>
        </div>

        {isMobileScreen && (
          <div className="mobileSignUpContainer">
            <SignUp />
            {/* <img src={startPageCover} width={330} height={250} alt=""></img> */}
            <img
              src="https://oss.genial.ltd/a8cfd/93f0ba99d661e14c66dc17be8c90c230.svg"
              width={330}
              height={250}
              alt=""
            ></img>
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

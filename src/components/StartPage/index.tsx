import React from 'react'
import { Col, Row } from 'antd'
import startPageCover from '../../static/startPageCover.svg'
import SignUp from './SignUp'
import Explain from './Explain'

import './style.css'

export interface IStartPageProps {

}

export default class StartPage extends React.Component<IStartPageProps, any> {

  render() {
    // const coverContainerStyle = {
    //   width
    // }
    return (
      <>
        <Row>
          <Col span={8}>
            <div className='logoHeader'>
              <p className='logoTitle'>Genial</p>
            </div>
          </Col>
        </Row>
        <Row gutter={[0,68]}>
          <Col span={12}>
            <div className='signUpBlock'>
              <SignUp />
            </div>
          </Col>
          <Col span={12}>
            <img className='startPageCover' src={startPageCover} alt=''></img>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row gutter={[0,68]}>
          <Col span={24}>
            <Explain />
          </Col>
        </Row>
      </>
    )
  }
}

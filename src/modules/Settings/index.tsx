import React from 'react'
import { Row, Col } from 'antd'

import './style.less'


export interface ISettingsProps {

}

export default class Settings extends React.Component<ISettingsProps, any> {
  render() {
    return (
      <div className='settingsContainer'>
        <Row>
          <Col span={6}>
            

          </Col>
          <Col span={18}>
            <div className='settingsContentContainer'>
              1234
            </div>
          </Col>

        </Row>
        

      </div>
      
      
    )
  }
}
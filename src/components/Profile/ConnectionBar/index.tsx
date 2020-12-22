import { Divider } from 'antd'
import React from 'react'

import './style.css'

export interface IConnectionBarProps {
  connectionNum?: number
}

export default class ConnectionBar extends React.Component <IConnectionBarProps, any> {

  render() {
    const { connectionNum } = this.props
    return (
      <div className='connectionContainer'>
        <Divider />
        <p className='connectionNum'>{connectionNum}</p>
        <p className='connectionTitle'>现有联系数</p>
      </div>
    )
  }
}
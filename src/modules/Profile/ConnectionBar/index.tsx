import { Divider } from 'antd'
import React from 'react'

import './style.less'

export interface IConnectionBarProps {
  connectionNum?: number
}

export default class ConnectionBar extends React.Component<
  IConnectionBarProps,
  any
> {
  render() {
    const { connectionNum } = this.props
    return (
      <div className="connectionContainer">
        <Divider />
        <p className="connectionTitle">你的邀请码</p>
        <p className="connectionNum">{connectionNum}</p>
      </div>
    )
  }
}

import React from 'react'
import { SolutionOutlined } from '@ant-design/icons'



import './style.less'

export default class SampleIntros extends React.Component {
  render() {
    return (
      <div className='sampleIntroContainer'>
        <p className='sampleTitle'>
          <SolutionOutlined />
          示例
        </p>
      </div>
    )
  }
}
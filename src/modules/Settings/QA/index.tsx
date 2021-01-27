import React from 'react'
import { Typography } from 'antd'
import { content } from './constants';

import './style.less'

const { Title, Paragraph, Text, Link } = Typography;

export interface IQAProps {}

export default class QA extends React.Component<IQAProps, any> {

  get qaContent() {
    return (
      content.map((item, index) => {
        return (
          <div key={index}>
            <Title level={4}>
              {item.question}
            </Title>
            <Paragraph>
              {item.answer}
            </Paragraph>
          </div>
        )
      })
    )
  }

  render() {
    return (
      <div className='qaContainer'>
        <Typography>
          <Title level={3}>
            FAQ
          </Title>
          {this.qaContent}       
        </Typography>

      </div>
    )
  }
}

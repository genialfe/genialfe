import React from 'react'
import './style.css'

export interface IUserIntroductionProps {
  content?: string
}

export default class UserIntroduction extends React.Component <IUserIntroductionProps, any> {

  render() {
    const { content } = this.props
    return (
      <div className='introContainer'>
        <p className='title'>简介</p>
        <p className='content'>{content}</p>
      </div>
    )
  }

}
import React from 'react'
import Weekly from '../../../static/readyPage/weekly.svg'
import Intro from '../../../static/readyPage/intro.svg'
import Connect from '../../../static/readyPage/connect.png'

import './style.less'

export default class DescBlock extends React.Component {
  render() {
    return (
      <>
        <div className='descRow'>
          <div className='col-8'>
            <img src={Weekly} alt="" />
            <p className="exp">每周登录来获得匹配</p>
          </div>
          <div className='col-8'>
            <img src={Intro} alt="" />
            <p className="exp">我们通过短信通知你和对方</p>
          </div>
          <div className='col-8'>
            <img src={Connect} alt="" />
            <p className="exp">通过视频会议和对方交流</p>
          </div>
        </div>
      </>
    )
  }
}

import React from 'react'

export interface IVideoCallProps {
  /**
   * 视频通话token
   */
  token: string
  /**
   * 视频通话channel(即matchId)
   */
  channel: string
}

export default class VideoCall extends React.Component<IVideoCallProps, any> {
  appId: string = '2bdbb08e0cf743009ff6385d632b6417'

  render() {
    console.log('props:', this.props)
    return <div>videoCall</div>
  }
}

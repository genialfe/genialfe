import React from 'react'
import Usercardlist from '../Usercardlist'

import './style.less'

export interface IHomeProps {}

export default class Home extends React.Component<IHomeProps, any> {
  render() {
    return (
      <>
        <div className="userListContainer">
          <Usercardlist />
        </div>
      </>
    )
  }
}

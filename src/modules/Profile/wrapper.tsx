import { message } from 'antd'
import { action, makeObservable, observable } from 'mobx'
import { observer } from 'mobx-react'
import React from 'react'
import Profile, { IProfileProps } from '.'
import { getUserProfile } from './api'

import './style.less'

@observer
export default class ProfileWrapper extends React.Component {
  profile: IProfileProps = {
    headImg: '',
    interest: '',
    introduction: '',
    point: 0,
    userName: ''
  }

  setProfile(profile: IProfileProps) {
    this.profile = profile
  }

  async getProfile() {
    const profileRes = await getUserProfile()
    if (profileRes.code === 200) {
      const { data } = profileRes
      const { goalIds, interestIds, ...profile } = data
      this.setProfile(profile)
    } else {
      message.info('出错了')
    }
  }

  componentDidMount() {
    this.getProfile()
  }

  constructor(props: any) {
    super(props)
    makeObservable(this, {
      setProfile: action,
      profile: observable
    })
  }

  render() {
    return (
      <>
        <div className="profileContainer">
          <Profile {...this.profile} />
        </div>
      </>
    )
  }
}

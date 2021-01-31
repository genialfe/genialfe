import { action, makeObservable, observable } from 'mobx'
import { observer } from 'mobx-react'
import React from 'react'
import Profile, { IProfileProps } from '.'

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

  componentDidMount() {
    const rawUserProfile = sessionStorage.getItem('profile')
    if (rawUserProfile) {
      const { goalIds, interestIds, ...profile } = JSON.parse(rawUserProfile)
      this.setProfile(profile)
    }
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

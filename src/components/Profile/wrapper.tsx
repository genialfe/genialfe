import { action, makeObservable, observable } from 'mobx'
import { observer } from 'mobx-react'
import React from 'react'
import Profile, { IProfileProps } from '.'

import './style.less'

@observer
export default class ProfileWrapper extends React.Component {
  profile: IProfileProps = {
    name: '',
    location: '',
    selfIntroduction: '',
    interests: [''],
    connections: 0
  }

  setProfile() {
    const name = sessionStorage.getItem('name')
    this.profile.name = name ? name : ''

    const location = sessionStorage.getItem('location')
    this.profile.location = location ? location : ''

    const selfIntroduction = sessionStorage.getItem('selfIntroduction')
    this.profile.selfIntroduction = selfIntroduction ? selfIntroduction : ''

    const interests = sessionStorage.getItem('interests')
    this.profile.interests = interests ? JSON.parse(interests) : undefined
  }

  componentDidMount() {
    this.setProfile()
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
      <div className="profileContainer">
        <Profile {...this.profile} />
      </div>
    )
  }
}

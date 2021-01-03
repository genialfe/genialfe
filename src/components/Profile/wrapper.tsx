import React from 'react'
import Profile from '.'


export default class ProfileWrapper extends React.Component {

  render() {
    return (
      <Profile
        name='测试用户'
        location='上海'
        introduction='测试用户是特斯拉的开发工程师。'
        interests={['天使投资','徒步旅行']}
        connections={2}
      />
    )
  }
}

import React from 'react'
import { Input, message } from 'antd'
import { observer } from 'mobx-react'
import { makeObservable, observable } from 'mobx'


import './style.css'


export interface ISignUpProps {

}

const { Search } = Input

@observer
export default class SignUp extends React.Component <ISignUpProps, any> {
  hasSentMsg: boolean = false

  isPhoneNumber(number: string) {
    const reg =/^0?1[3|4|5|6|7|8][0-9]\d{8}$/
    return reg.test(number)
  }

  illegalPhoneNumberAlert() {
    message.info('请输入合法的手机号码')
  }

  switchHasSentMsg() {
    this.hasSentMsg = true
  }

  constructor(props: ISignUpProps) {
    super(props)
    makeObservable(this, {
      hasSentMsg: observable,
    })
  }

  render() {
    const onSubmitPhoneNumber = (number: string) => {
      if(this.isPhoneNumber(number)){
        // ......
        console.log("phoneNumber:", number)
        this.switchHasSentMsg()
        // eslint-disable-next-line no-restricted-globals
        location.pathname = '/login'
      }else{
        this.illegalPhoneNumberAlert()
      }
    }
    // const onLogin = (code: string) => {
    //   console.log("code:", code)
    // }
    return (
      <>
        <p className='slogan'>开始和行业大咖建立你们之间的联系吧</p>
        <p className='subSlogan'>帮助你1:1精准匹配</p>
        {/* <p className='info'>第一步：使用手机号注册/登陆</p> */}
        <Search
          className='phoneNumberInput'
          placeholder='你的中国大陆手机号'
          enterButton='开始'
          size="large"
          color='blue'
          onSearch={onSubmitPhoneNumber}
        />
        <p className='memberTip'>
          已经是Genial会员？
          <a href='/login'>点击登陆</a>
          {/* <Button>
            点击登陆
          </Button> */}
        </p>
      </>
    )
  }
}
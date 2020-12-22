import React from 'react'
import { Menu } from 'antd'
import { observer } from 'mobx-react'
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons'
import { action, makeObservable, observable } from 'mobx'
// import bind from '../../utils/bind'

export interface INavBarProps {

}

@observer
export default class NavBar extends React.Component <INavBarProps, any> {

  current: string = ''

  setCurrent(t: string) {
    this.current = t
  }

  handleClick = (e: any) => {
    console.log('click ', e)
    this.setCurrent(e.key)
    console.log("this.curretn:", this.current)
  }

  constructor(props: INavBarProps) {
    super(props)
    makeObservable(this, {
      current: observable,
      setCurrent: action
    })
    // this.current = current
  }

  render() {
    return (
      <Menu onClick={this.handleClick} selectedKeys={[this.current]} mode="horizontal">
        <Menu.Item key="mail" icon={<MailOutlined />}>
          Navigation One
        </Menu.Item>
        <Menu.Item key="app" icon={<AppstoreOutlined />}>
          Navigation Two
        </Menu.Item>
      </Menu>
    )
  }

}
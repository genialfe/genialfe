import { Dropdown, Menu } from 'antd'
import React from 'react'
import {
  Nav,
  NavLink,
  Bars,
  NavMenu
  // NavBtn,
  // NavBtnLink
} from './NavBarElements'

import './style.less'

export default class Navbar extends React.Component {

  handleClickBars() {
    console.log("123")
  }

  get dropdownMenu() {
    return (
      <Menu>
        <Menu.Item key="0">
          <NavLink to="/home">主页</NavLink>
        </Menu.Item>
        <Menu.Item key="1">
          <NavLink to="/meetings">会议</NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/profile">个人</NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink to="/settings">更多</NavLink>
        </Menu.Item>
      </Menu>
    )
  }

  render() {
    return (
      <>
      <Nav>
        <NavLink to="/home">
          <p className="logo">Genial</p>
        </NavLink>
        <Dropdown
          overlay={this.dropdownMenu}
          trigger={['click']}
          placement='bottomCenter'
        >
          <Bars />
        </Dropdown>
        <NavMenu>
          <NavLink to="/home">主页</NavLink>
          <NavLink to="/meetings">会议</NavLink>
          <NavLink to="/profile">个人</NavLink>
          <NavLink to="/settings">更多</NavLink>
        </NavMenu>
      </Nav>
    </>

    )
  }
}

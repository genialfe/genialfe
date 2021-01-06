import React, { FC } from 'react'
import {
  Nav,
  NavLink,
  Bars,
  NavMenu
  // NavBtn,
  // NavBtnLink
} from './NavBarElements'

import './style.less'

const Navbar: FC = () => {
  return (
    <>
      <Nav>
        <NavLink to="/home">
          <p className="logo">Genial</p>
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/home">主页</NavLink>
          <NavLink to="/meetings">会议</NavLink>
          <NavLink to="/profile">个人</NavLink>
          <NavLink to="/settings">设置</NavLink>
        </NavMenu>
      </Nav>
    </>
  )
}

export default Navbar

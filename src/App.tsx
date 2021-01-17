import React from 'react'
import { observer } from 'mobx-react'
import StartPage from './components/StartPage'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Usercardlist from './components/Usercardlist'
import Login from './components/Login'
import Register from './components/Register'
// import ProfileWrapper from './components/Profile/wrapper'
import MainApp from './components/MainApp'

export interface IAppProps {}
@observer
export default class App extends React.Component<IAppProps, any> {
  render() {
    const isPC = !window.matchMedia('(max-width:1024px)').matches
    return (
      <>
        {isPC && (
          <Router>
            <Route path="/" exact component={StartPage} />
            <Route path="/userCard" component={Usercardlist} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/home" component={MainApp} />
            <Route path="/weekly" component={MainApp} />
          </Router>
        )}
        {!isPC && <div>推荐使用PC端访问</div>}
      </>
    )
  }
}

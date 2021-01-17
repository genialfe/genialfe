import React from 'react'
import NavBar from '../NavBar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from '../Home'
import Meetings from '../Meetings'
import ProfileWrapper from '../Profile/wrapper'
import Settings from '../Settings'
import Weekly from '../Weekly'

import './style.less'

export interface IHomeProps {}
export default class MainApp extends React.Component<IHomeProps, any> {
  render() {
    return (
      <Router>
        <div className="appWrapper">
          <NavBar />
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/meetings" component={Meetings} />
            <Route path="/weekly" component={Weekly} />
            <Route path="/profile" component={ProfileWrapper} />
            <Route path='/settings' component={Settings}  />
          </Switch>
        </div>
      </Router>
    )
  }
}

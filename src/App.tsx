import React from 'react'
import { observer } from 'mobx-react'
import StartPage from './components/StartPage'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import NavBar from './components/Navbar'
import Usercardlist from './components/Usercardlist'
import Login from './components/Login'
import Register from './components/Register'
import ProfileWrapper from './components/Profile/wrapper'

export interface IAppProps {

}
@observer
export default class App extends React.Component<IAppProps, any> {

  render() {
    return (
      <>
        <Router>
          <Route path='/' exact component={StartPage} />
          <Route path='/nav' component={NavBar} />
          <Route path='/userCard' component={Usercardlist} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/profile' component={ProfileWrapper} />
        </Router>
      </>
    )
  }
}


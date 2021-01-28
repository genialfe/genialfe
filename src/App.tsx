import React from 'react'
import { observer } from 'mobx-react'
import Cookies from 'universal-cookie'
import StartPage from './modules/StartPage'
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import Login from './modules/Login'
import Register from './modules/Register'
import MainApp from './modules/MainApp'

export interface IAppProps {}

const cookies = new Cookies()
@observer
export default class App extends React.Component<IAppProps, any> {
  render() {
    const loggedIn = cookies.get('token')
    const submittedPhoneNumber = sessionStorage.getItem('phoneNumber')
    return (
      <>
        <Router>
          <Route path="/" exact component={StartPage} />
          <Route path="/login" component={Login} />
          <Route path="/register">
            {submittedPhoneNumber ? <Register /> : <Redirect to="/" />}
          </Route>
          <Route path="/home">
            {loggedIn ? <MainApp /> : <Redirect to="/" />}
          </Route>
          <Route path="/meetings">
            {loggedIn ? <MainApp /> : <Redirect to="/" />}
          </Route>
          <Route path="/weekly">
            {loggedIn ? <MainApp /> : <Redirect to="/" />}
          </Route>
          <Route path="/profile">
            {loggedIn ? <MainApp /> : <Redirect to="/" />}
          </Route>
          <Route path="/settings">
            {loggedIn ? <MainApp /> : <Redirect to="/" />}
          </Route>
        </Router>
      </>
    )
  }
}

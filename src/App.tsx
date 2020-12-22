import React from 'react'
import { observer } from 'mobx-react'
import StartPage from './components/StartPage'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import NavBar from './components/Navbar'

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
        </Router>
      </>
    )
  }
}


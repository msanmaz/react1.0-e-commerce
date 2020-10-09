/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { BrowserRouter as Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { checkUserSession} from './redux/User/user.actions'
//hoc
import WithAuth from './hoc/withAuth'

//components
import Homepage from './pages/homepage/';
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';
import Registration from './pages/registration'
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Recovery from './pages/recovery';
import './default.css';



const App = props => {


  const dispatch = useDispatch();

useEffect(() => {
  dispatch(checkUserSession())
},[])

  return (
    <div className='app'>
      <Switch>
        <Route exact path="/" render={() => (
          <HomepageLayout>
            <Homepage />
          </HomepageLayout>
        )}
        />
        <Route path="/registration" render={() => (
          <MainLayout >
            <Registration />
          </MainLayout>
        )} />
        <Route path="/login"
          render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )} />
        <Route path="/recovery"
          render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )} />
        <Route path="/dashboard"
          render={() => (
            <WithAuth>
            <MainLayout>
              <Dashboard />
            </MainLayout>
            </WithAuth>
          )} />
      </Switch>
    </div>
  )

}




export default App;
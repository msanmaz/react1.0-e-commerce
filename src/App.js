/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { setCurrentUser } from './redux/User/user.actions';
import { BrowserRouter as Switch, Route, Redirect } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';
import { connect } from 'react-redux'

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

  const { setCurrentUser, currentUser } = props;


  useEffect(() => {

    const authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        });
      }
      setCurrentUser(userAuth)
    });

    return () => {
      authListener();

    }


  }, [])

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


const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispacthToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))

})


export default connect(mapStateToProps, mapDispacthToProps)(App);
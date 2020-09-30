import React, { Component } from 'react';
import { BrowserRouter as Switch, Route, Redirect } from 'react-router-dom';
import { auth,handleUserProfile } from './firebase/utils';
import Homepage from './pages/homepage/';
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';
import Registration from './pages/registration'
import Login from './pages/login';
import './default.css';


const initialState = {
  currentUser: null
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    };
  }

  authListener = null;

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth){
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser:{
              id:snapshot.id,
              ...snapshot.data()
            }
          })
        });
      }
      this.setState({
        ...initialState
      })
    });
  }

  componentWillUnmount() {
    this.authListener();
  }

  render() {
    const { currentUser } = this.state
    return (
      <div className='app'>
        <Switch>
          <Route exact path="/" render={() => (
            <HomepageLayout currentUser={currentUser}>
              <Homepage />
            </HomepageLayout>
          )}
          />
          <Route path="/registration" render={() => currentUser ? <Redirect to='/' /> :(
            <MainLayout currentUser={currentUser}>
              <Registration />
            </MainLayout>
          )} />
          <Route path="/login"
            render={() => currentUser ? <Redirect to='/' /> : (
              <MainLayout currentUser={currentUser}>
                <Login />
              </MainLayout>
            )} />
        </Switch>
      </div>
    )

  }

}


export default App;
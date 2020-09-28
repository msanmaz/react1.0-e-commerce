import React from 'react';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './pages/homepage/';
import Registration from './pages/registration'


import './default.css';

function App() {
  return (
    <div className='app'>
      <Router>
      <Header />
      <Switch>
          <Route path='/registration' component={Registration} />
          <Route path='/' component={Homepage} />
        </Switch>
      </Router>
    </div>
  )
}


export default App;
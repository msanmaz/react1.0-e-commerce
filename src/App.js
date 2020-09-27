import React from 'react';
import Header from './components/Header';
import Homepage from './pages/homepage/';
import './default.css';

function App (){
  return (
    <div className='app'>
            <Header/>
      <div className='main'>
    <Homepage/>
      </div>

    </div>
  )
}


export default App;
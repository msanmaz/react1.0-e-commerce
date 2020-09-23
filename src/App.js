import React from 'react';

function App (){

  const sayHello = () =>{
    console.log('hellobitch');
  }

  
  return (
    <div>
      <h1>Hello React</h1>
      <button onClick={sayHello} >hello</button>
    </div>
  )
}


export default App;
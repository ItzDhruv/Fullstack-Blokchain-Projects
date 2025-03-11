import { useState } from 'react'


import {usePrivy} from '@privy-io/react-auth';
function App() {
  
  const {login} = usePrivy();

  return (
   <>
   
   <div className="container">
<div className="header">
<button onClick={() => login({loginMethods: [ 'wallet']})} id='meta-btn'>
  Connect Wallet 
</button>
</div>
  <div className="box">
    <div className="input">
      <input type="text" placeholder="         Reciver address" />
    </div>
    <div className="button">
      <button> Send </button>
      <button id='btn2'>Cancel</button>

    </div>
  </div>
   </div>

   </>
  )
}

export default App
